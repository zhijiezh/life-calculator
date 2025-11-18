import { useState, useRef, useMemo, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import NumberField from './NumberField'

interface Props {
  years: number
  currency: 'USD' | 'CNY'
  points: Array<{ year: number; salary: number }>
  onChange: (points: Array<{ year: number; salary: number }>) => void
}

export default function SalaryCurveEditor({ years, currency, points, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // 根据屏幕大小设置移动端标识
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 600
      setIsMobile(mobile)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // 生成完整的数据用于显示曲线
  const generateChartData = (): Array<{ year: number; salary: number }> => {
    const data: Array<{ year: number; salary: number }> = []
    const sortedPoints = [...points].sort((a, b) => a.year - b.year)

    if (sortedPoints.length === 0) {
      return Array.from({ length: years }, (_, i) => ({ year: i + 1, salary: 0 }))
    }

    for (let year = 1; year <= years; year++) {
      let salary = 0

      // 检查是否是数据点
      const pointIndex = sortedPoints.findIndex((p) => p.year === year)
      if (pointIndex !== -1) {
        salary = sortedPoints[pointIndex].salary
      } else {
        // 线性插值
        if (year < sortedPoints[0].year) {
          salary = sortedPoints[0].salary
        } else if (year > sortedPoints[sortedPoints.length - 1].year) {
          salary = sortedPoints[sortedPoints.length - 1].salary
        } else {
          for (let i = 0; i < sortedPoints.length - 1; i++) {
            if (year >= sortedPoints[i].year && year <= sortedPoints[i + 1].year) {
              const ratio =
                (year - sortedPoints[i].year) /
                (sortedPoints[i + 1].year - sortedPoints[i].year)
              salary =
                sortedPoints[i].salary +
                (sortedPoints[i + 1].salary - sortedPoints[i].salary) * ratio
              break
            }
          }
        }
      }

      data.push({ year, salary })
    }

    return data
  }

  const chartData = useMemo(() => generateChartData(), [points, years])

  // 添加新点的通用函数，可以指定年份
  const handleAddPoint = (targetYear?: number) => {
    const newYear = targetYear || Math.floor(years / 2)
    const existingPoint = points.find((p) => p.year === newYear)
    if (existingPoint) {
      // 如果已存在，选中它进行编辑
      const pointIndex = points.findIndex((p) => p.year === newYear)
      setEditingIndex(pointIndex)
      return
    }

    // 计算新点的工资（使用插值）
    let newSalary = 200000
    const sortedPoints = [...points].sort((a, b) => a.year - b.year)
    if (sortedPoints.length > 0) {
      if (newYear < sortedPoints[0].year) {
        newSalary = sortedPoints[0].salary
      } else if (newYear > sortedPoints[sortedPoints.length - 1].year) {
        newSalary = sortedPoints[sortedPoints.length - 1].salary
      } else {
        for (let i = 0; i < sortedPoints.length - 1; i++) {
          if (newYear >= sortedPoints[i].year && newYear <= sortedPoints[i + 1].year) {
            const ratio =
              (newYear - sortedPoints[i].year) /
              (sortedPoints[i + 1].year - sortedPoints[i].year)
            newSalary =
              sortedPoints[i].salary +
              (sortedPoints[i + 1].salary - sortedPoints[i].salary) * ratio
            break
          }
        }
      }
    }

    const newPoints = [...points, { year: newYear, salary: newSalary }]
    const sortedNewPoints = newPoints.sort((a, b) => a.year - b.year)
    onChange(sortedNewPoints)
    
    // 选中新添加的点
    const newIndex = sortedNewPoints.findIndex((p) => p.year === newYear)
    setEditingIndex(newIndex)
  }

  const handleDeletePoint = (index: number) => {
    if (points.length <= 1) return
    const newPoints = points.filter((_, i) => i !== index)
    onChange(newPoints)
  }

  const handlePointChange = (index: number, field: 'year' | 'salary', value: number) => {
    const newPoints = [...points]
    newPoints[index] = { ...newPoints[index], [field]: value }
    
    // 确保年份不重复
    const yearExists = newPoints.some((p, i) => i !== index && p.year === newPoints[index].year)
    if (yearExists) {
      return // 不更新如果年份重复
    }
    
    onChange(newPoints.sort((a, b) => a.year - b.year))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const maxSalary = useMemo(() => {
    if (points.length === 0) return 500000
    const salaries = points.map((p) => p.salary)
    return Math.max(...salaries, 100000) * 1.2 || 500000
  }, [points])

  // 在图表上绘制可点击的点 - 使用更大的触摸目标
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props
    const pointIndex = points.findIndex((p) => p.year === payload.year)
    if (pointIndex === -1) return null

    return (
      <g>
        {/* 更大的透明点击区域，方便移动端点击 */}
        <circle
          cx={cx}
          cy={cy}
          r={20}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            setEditingIndex(pointIndex)
          }}
          onTouchStart={(e) => {
            e.stopPropagation()
            setEditingIndex(pointIndex)
          }}
        />
        {/* 可见的点 - 使用状态而不是直接访问 window */}
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#1976d2"
          stroke="#fff"
          strokeWidth={2}
          style={{ cursor: 'pointer', pointerEvents: 'none' }}
        />
      </g>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1, minWidth: 200 }}>
          点击图表上的点或下方输入框编辑，点击 + 添加新点
        </Typography>
        <IconButton 
          onClick={() => handleAddPoint()} 
          size="medium" 
          color="primary"
          sx={{ 
            minWidth: 40,
            minHeight: 40
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
        <div ref={containerRef} style={{ position: 'relative' }}>
          <Box 
            sx={{ 
              width: '100%', 
              height: { xs: 450, sm: 500 },
              minHeight: { xs: 450, sm: 500 },
              overflow: 'hidden'
            }}
          >
            <ResponsiveContainer width="100%" height="100%" debounce={200}>
            <LineChart 
              data={chartData} 
              margin={{ 
                left: isMobile ? 35 : 45, 
                right: isMobile ? 10 : 20, 
                top: isMobile ? 35 : 45, 
                bottom: isMobile ? 50 : 40 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{ value: '年份', position: 'insideBottom', offset: isMobile ? -10 : -5 }}
                domain={[1, years]}
                tick={{ fontSize: isMobile ? 12 : 14 }}
              />
              <YAxis
                label={{ 
                  value: `工资 (${currency})`, 
                  angle: 0, 
                  position: 'top',
                  style: { fontSize: isMobile ? 12 : 14, textAnchor: 'middle' },
                  offset: 5
                }}
                domain={[0, maxSalary]}
                tickFormatter={(value) => {
                  // 简化显示，大数字用K表示
                  if (value >= 1000) {
                    return `$${(value / 1000).toFixed(0)}K`
                  }
                  return formatCurrency(value)
                }}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 35 : 45}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `第 ${label} 年`}
              />
              <Line
                type="monotone"
                dataKey="salary"
                stroke="#1976d2"
                strokeWidth={isMobile ? 3 : 2}
                dot={<CustomDot />}
                activeDot={{ r: isMobile ? 10 : 8 }}
                onClick={(event: any) => {
                  // 点击线条时，检查是否有现有点，没有则添加新点
                  if (event && event.activePayload && event.activePayload[0]) {
                    const clickedData = event.activePayload[0].payload
                    const clickedYear = clickedData?.year
                    if (clickedYear) {
                      handleAddPoint(clickedYear)
                    }
                  }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          </Box>

          {/* 显示数据点编辑 */}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {points
              .sort((a, b) => a.year - b.year)
              .map((point) => {
                const index = points.findIndex((p) => p === point)
                const isEditing = editingIndex === index
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1,
                      bgcolor: isEditing ? 'action.selected' : 'action.hover',
                      borderRadius: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box sx={{ width: 100 }} onClick={() => setEditingIndex(index)}>
                      <NumberField
                        size="small"
                        label="年份"
                        defaultValue={point.year}
                        onValueChange={(value) => {
                          if (value !== null) {
                            handlePointChange(index, 'year', value)
                          }
                        }}
                        min={1}
                        max={years}
                        step={1}
                        fullWidth
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 150 }} onClick={() => setEditingIndex(index)}>
                      <NumberField
                        size="small"
                        label="工资"
                        defaultValue={point.salary}
                        onValueChange={(value) => {
                          if (value !== null) {
                            handlePointChange(index, 'salary', value)
                          }
                        }}
                        min={0}
                        step={1000}
                        fullWidth
                      />
                    </Box>
                    <Typography variant="caption" sx={{ minWidth: 100 }}>
                      {formatCurrency(point.salary)}
                    </Typography>
                    {points.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          handleDeletePoint(index)
                          if (editingIndex === index) setEditingIndex(null)
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                )
              })}
          </Box>
        </div>
      </Paper>
    </Box>
  )
}

