import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
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
import ChartContainer from './ChartContainer'

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

  const formatCompactNumber = (number: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(number)
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

  const commonChartProps = {
    margin: { top: 10, right: 30, left: 0, bottom: 30 },
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        详细图表
      </Typography>

      {/* 净收入图 */}
      <ChartContainer title="年净收入趋势">
        <ResponsiveContainer width="100%" height={380} debounce={200}>
          <LineChart data={chartData} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: '年份', position: 'insideBottom' }} 
              height={40}
            />
            <YAxis 
              tickFormatter={(value) => formatCompactNumber(value)} 
              width={50}
            />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
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
      </ChartContainer>

      {/* 总储蓄对比图（有投资 vs 无投资） */}
      <ChartContainer title="总储蓄对比：有投资 vs 无投资">
        <ResponsiveContainer width="100%" height={380} debounce={200}>
          <LineChart data={chartData} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: '年份', position: 'insideBottom'}} 
              height={40}
            />
            <YAxis 
              tickFormatter={(value) => formatCompactNumber(value)} 
              width={50}
            />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
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
      </ChartContainer>

      {/* 收入构成图 */}
      <ChartContainer title="收入构成">
        <ResponsiveContainer width="100%" height={380} debounce={200}>
          <LineChart data={chartData} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: '年份', position: 'insideBottom' }} 
              height={40}
            />
            <YAxis 
              tickFormatter={(value) => formatCompactNumber(value)} 
              width={50}
            />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
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
      </ChartContainer>

      {/* 投资收入占比图 */}
      <ChartContainer title="投资收入占比趋势">
        <ResponsiveContainer width="100%" height={380} debounce={200}>
          <LineChart data={chartData} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: '年份', position: 'insideBottom' }} 
              height={40}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`} 
              width={50}
            />
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
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
      </ChartContainer>
    </Box>
  )
}

