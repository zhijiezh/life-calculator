import { Box, Paper, Typography } from '@mui/material'
import { CalculatorData } from '../types'
import { lifeCalculator, findFirstYear, calculateAffordability } from '../utils/calculator'
import ResultsCharts from '../components/ResultsCharts'
import AffordabilityCard from '../components/AffordabilityCard'

const VILLA_PRICE = 3000000

interface Props {
  data: CalculatorData
}

export default function ResultsBody({ data }: Props) {
  const result = lifeCalculator(data)
  const affordability = calculateAffordability(result, VILLA_PRICE)

  const incomeTargetYear = findFirstYear(result, 'netIncome', data.incomeTarget)
  const savingsTargetYear = findFirstYear(result, 'totalSavings', data.savingsTarget)
  const investmentPercentageTargetYear = findFirstYear(
    result,
    'investmentPercentage',
    data.investmentPercentageTarget
  )

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 1,
        }}
      >
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="primary">
            {formatCurrency(result.totalSavings[result.totalSavings.length - 1])}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {data.years} 年后总储蓄
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="success.main">
            {formatCurrency(result.netIncome[result.netIncome.length - 1])}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            第 {data.years} 年净收入
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="warning.main">
            {result.investmentPercentage[result.investmentPercentage.length - 1].toFixed(1)}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            投资收入占比
          </Typography>
        </Paper>
      </Box>

      {(incomeTargetYear || savingsTargetYear || investmentPercentageTargetYear) && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            目标达成情况
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {incomeTargetYear && (
              <Typography variant="body2">
                ✅ 年净收入目标 ({formatCurrency(data.incomeTarget)}) 将在第 {incomeTargetYear} 年达成
              </Typography>
            )}
            {savingsTargetYear && (
              <Typography variant="body2">
                ✅ 总储蓄目标 ({formatCurrency(data.savingsTarget)}) 将在第 {savingsTargetYear} 年达成
              </Typography>
            )}
            {investmentPercentageTargetYear && (
              <Typography variant="body2">
                ✅ 投资收入占比目标 ({data.investmentPercentageTarget}%) 将在第{' '}
                {investmentPercentageTargetYear} 年达成
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <AffordabilityCard
        itemName="300万美元别墅"
        itemPrice={VILLA_PRICE}
        affordability={affordability}
        currency={data.currency}
      />

      <ResultsCharts
        result={result}
        data={data}
        incomeTargetYear={incomeTargetYear}
        savingsTargetYear={savingsTargetYear}
        investmentPercentageTargetYear={investmentPercentageTargetYear}
      />
    </Box>
  )
}

