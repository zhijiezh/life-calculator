import { useMemo } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { CalculationResult, CalculatorData } from '../types'

interface Props {
  result: CalculationResult
  data: CalculatorData
  incomeTargetYear: number | null
  savingsTargetYear: number | null
  investmentPercentageTargetYear: number | null
}

export default function ResultsCharts({
  result,
  data,
  incomeTargetYear,
  savingsTargetYear,
  investmentPercentageTargetYear,
}: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const chartData = useMemo(
    () =>
      result.years.map((year, index) => ({
        year,
        netIncome: result.netIncome[index],
        totalSavings: result.totalSavings[index],
        investmentIncome: result.investmentIncome[index],
        salaryIncome: result.salaryIncome[index],
        spending: result.spending[index],
        savingWithoutInvestment: result.savingWithoutInvestment[index],
        investmentPercentage: result.investmentPercentage[index],
      })),
    [result]
  )

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        详细图表
      </Typography>

      {/* 净收入图 */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          年净收入趋势
        </Typography>
        <Box 
          sx={{ 
            width: '100%', 
            overflowX: 'auto',
            overflowY: 'hidden',  // 禁止垂直滚动
          }}
        >
          <ResponsiveContainer width="100%" height={380} minWidth={300} debounce={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: '年份', position: 'insideBottom', offset: -5 }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="netIncome"
              stroke="#2e7d32"
              strokeWidth={2}
              name="净收入"
            />
            {incomeTargetYear && (
              <>
                <ReferenceLine
                  x={incomeTargetYear}
                  stroke="#d32f2f"
                  strokeDasharray="6 2"
                  label="目标年份"
                />
                <ReferenceLine
                  y={data.incomeTarget}
                  stroke="#d32f2f"
                  strokeDasharray="6 2"
                  label="目标值"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
        </Box>
      </Paper>

      {/* 总储蓄对比图（有投资 vs 无投资） */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3, overflow: 'hidden' }}>
        <Typography variant="subtitle1" gutterBottom>
          总储蓄对比：有投资 vs 无投资
        </Typography>
        <Box 
          sx={{ 
            width: '100%', 
            overflowX: 'auto',
            overflowY: 'hidden',  // 禁止垂直滚动
          }}
        >
          <ResponsiveContainer width="100%" height={380} minWidth={300} debounce={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: '年份', position: 'insideBottom', offset: -5 }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalSavings"
              stroke="#1976d2"
              strokeWidth={2}
              name="有投资的总储蓄"
            />
            <Line
              type="monotone"
              dataKey="savingWithoutInvestment"
              stroke="#9e9e9e"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="无投资的总储蓄"
            />
            {savingsTargetYear && (
              <>
                <ReferenceLine
                  x={savingsTargetYear}
                  stroke="#d32f2f"
                  strokeDasharray="6 2"
                  label="目标年份"
                />
                <ReferenceLine
                  y={data.savingsTarget}
                  stroke="#d32f2f"
                  strokeDasharray="6 2"
                  label="目标值"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
        </Box>
      </Paper>

      {/* 收入构成图 */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          收入构成
        </Typography>
        <Box 
          sx={{ 
            width: '100%', 
            overflowX: 'auto',
            overflowY: 'hidden',  // 禁止垂直滚动
          }}
        >
          <ResponsiveContainer width="100%" height={380} minWidth={300} debounce={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: '年份', position: 'insideBottom', offset: -5 }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="salaryIncome"
              stroke="#1976d2"
              strokeWidth={2}
              name="工资收入"
            />
            <Line
              type="monotone"
              dataKey="investmentIncome"
              stroke="#ed6c02"
              strokeWidth={2}
              name="投资收入"
            />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#d32f2f"
              strokeWidth={2}
              name="支出"
            />
          </LineChart>
        </ResponsiveContainer>
        </Box>
      </Paper>

      {/* 投资收入占比图 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          投资收入占比趋势
        </Typography>
        <Box 
          sx={{ 
            width: '100%', 
            overflowX: 'auto',
            overflowY: 'hidden',  // 禁止垂直滚动
          }}
        >
          <ResponsiveContainer width="100%" height={380} minWidth={300} debounce={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: '年份', position: 'insideBottom', offset: -5 }} />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="investmentPercentage"
              stroke="#ed6c02"
              strokeWidth={2}
              name="投资收入占比"
            />
            {investmentPercentageTargetYear && (
              <>
                <ReferenceLine
                  x={investmentPercentageTargetYear}
                  stroke="#d32f2f"
                  strokeDasharray="6 2"
                  label="目标年份"
                />
                <ReferenceLine
                  y={data.investmentPercentageTarget}
                  stroke="#d32f2f"
                  strokeDasharray="6 2"
                  label="目标值"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  )
}

