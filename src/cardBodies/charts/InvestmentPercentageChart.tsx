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
  investmentPercentageTargetYear: number | null
}

export default function InvestmentPercentageChart({
  result,
  data,
  investmentPercentageTargetYear,
}: Props) {
  const chartData = useChartData(result)

  const commonChartProps = {
    margin: { top: 10, right: 30, left: 0, bottom: 30 },
  }

  return (
    <ChartContainer title="投资收入占比趋势">
      <ResponsiveContainer width="100%" height={380} debounce={200}>
        <LineChart data={chartData} {...commonChartProps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: '年份', position: 'insideBottom' }}
            height={40}
          />
          <YAxis tickFormatter={(value) => `${value}%`} width={50} />
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
  )
}
