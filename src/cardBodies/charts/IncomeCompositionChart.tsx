import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CalculatorData, CalculationResult } from '../../types'
import { useChartData } from '../../hooks/useChartData'
import ChartContainer from '../../components/ChartContainer'

interface Props {
  result: CalculationResult
  data: CalculatorData
}

export default function IncomeCompositionChart({ result, data }: Props) {
  const chartData = useChartData(result)

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

  const commonChartProps = {
    margin: { top: 10, right: 30, left: 0, bottom: 30 },
  }

  return (
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
  )
}
