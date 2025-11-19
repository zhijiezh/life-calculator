import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts'
import { CalculatorData, CalculationResult } from '../../types'
import { useChartData } from '../../hooks/useChartData'
import ChartContainer from '../../components/ChartContainer'

interface Props {
  result: CalculationResult
  data: CalculatorData
  savingsTargetYear: number | null
}

export default function TotalSavingsChart({ result, data, savingsTargetYear }: Props) {
  const chartData = useChartData(result)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(data.locale, {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCompactNumber = (number: number) => {
    return new Intl.NumberFormat(data.locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(number)
  }

  const commonChartProps = {
    margin: { top: 10, right: 30, left: 0, bottom: 30 },
  }

  return (
    <ChartContainer title="总储蓄对比：有投资 vs 无投资">
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
    </ChartContainer>
  )
}
