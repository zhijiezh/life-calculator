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

export default function ResultsSummaryContent({
  result,
  data,
  incomeTargetYear,
  savingsTargetYear,
  investmentPercentageTargetYear,
  affordability,
}: Props) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(data.locale, {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 3 }, height: { xs: '100%', md: 'auto' }, overflowY: { xs: 'auto', md: 'visible' }, px: { xs: 1, md: 0 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
        }}
      >
        <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, textAlign: 'center' }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }, fontWeight: 'bold' }}
          >
            {formatCurrency(result.totalSavings[result.totalSavings.length - 1])}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' }, lineHeight: 1.2, display: 'block' }}
          >
            {data.years} 年后总储蓄
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, textAlign: 'center' }}>
          <Typography
            variant="h6"
            color="success.main"
            sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }, fontWeight: 'bold' }}
          >
            {formatCurrency(result.netIncome[result.netIncome.length - 1])}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' }, lineHeight: 1.2, display: 'block' }}
          >
            第 {data.years} 年净收入
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 }, textAlign: 'center' }}>
          <Typography
            variant="h6"
            color="warning.main"
            sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' }, fontWeight: 'bold' }}
          >
            {result.investmentPercentage[result.investmentPercentage.length - 1].toFixed(1)}%
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' }, lineHeight: 1.2, display: 'block' }}
          >
            投资收入占比
          </Typography>
        </Paper>
      </Box>

      {(incomeTargetYear || savingsTargetYear || investmentPercentageTargetYear) && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', py: { xs: 1, md: 0 } }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: { xs: 'none', md: 'block' } }}>
            目标达成情况
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {incomeTargetYear && (
              <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                ✅ 年净收入目标 ({formatCurrency(data.incomeTarget)}) 将在第 {incomeTargetYear} 年达成
              </Typography>
            )}
            {savingsTargetYear && (
              <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                ✅ 总储蓄目标 ({formatCurrency(data.savingsTarget)}) 将在第 {savingsTargetYear} 年达成
              </Typography>
            )}
            {investmentPercentageTargetYear && (
              <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                ✅ 投资收入占比目标 ({data.investmentPercentageTarget}%) 将在第{' '}
                {investmentPercentageTargetYear} 年达成
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <AffordabilityCard
        itemName={data.dreamItemName}
        itemPrice={data.dreamItemPrice}
        affordability={affordability}
        currency={data.currency}
        locale={data.locale}
        sx={{
          mb: 0,
        }}
      />
    </Box>
  )
}
