import { Box, Paper, Typography } from '@mui/material'
import { CalculatorData, CalculationResult } from '../types'
import AffordabilityCard from './AffordabilityCard'

interface Props {
  result: CalculationResult
  data: CalculatorData
  incomeTargetYear: number | null
  savingsTargetYear: number | null
  investmentPercentageTargetYear: number | null
  affordability: {
    canAffordYear: number | null
    canAffordMultiple: Array<{ year: number; count: number }>
  }
}

const VILLA_PRICE = 3000000

export default function ResultsSummaryContent({
  result,
  data,
  incomeTargetYear,
  savingsTargetYear,
  investmentPercentageTargetYear,
  affordability,
}: Props) {
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
    </Box>
  )
}
