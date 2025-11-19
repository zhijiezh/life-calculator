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
import { CalculatorData, CalculationResult } from '../../types'
import { useChartData } from '../../hooks/useChartData'
import ChartContainer from '../../components/ChartContainer'

interface Props {
  result: CalculationResult
  data: CalculatorData
  incomeTargetYear: number | null
}

export default function NetIncomeChart({ result, data, incomeTargetYear }: Props) {
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
  )
}
