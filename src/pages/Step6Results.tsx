import { Container, Paper, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import { lifeCalculator, findFirstYear, calculateAffordability } from '../utils/calculator'
import ResultsCharts from '../components/ResultsCharts'
import AffordabilityCard from '../components/AffordabilityCard'

interface Props {
  data: CalculatorData
}

const VILLA_PRICE = 3000000 // 300万美元的别墅

export default function Step6Results({ data }: Props) {
  const navigate = useNavigate()
  const result = lifeCalculator(data)
  const affordability = calculateAffordability(result, VILLA_PRICE)

  const incomeTargetYear = findFirstYear(result, 'netIncome', data.incomeTarget)
  const savingsTargetYear = findFirstYear(result, 'totalSavings', data.savingsTarget)
  const investmentPercentageTargetYear = findFirstYear(
    result,
    'investmentPercentage',
    data.investmentPercentageTarget
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          计算结果
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          基于你的输入，以下是未来 {data.years} 年的财务预测
        </Typography>

        {/* 关键指标 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mb: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">
              {formatCurrency(result.totalSavings[result.totalSavings.length - 1])}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.years} 年后总储蓄
            </Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              {formatCurrency(result.netIncome[result.netIncome.length - 1])}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              第 {data.years} 年净收入
            </Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="warning.main">
              {result.investmentPercentage[result.investmentPercentage.length - 1].toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              投资收入占比
            </Typography>
          </Paper>
        </Box>

        {/* 目标达成情况 */}
        {(incomeTargetYear || savingsTargetYear || investmentPercentageTargetYear) && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              目标达成情况
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {incomeTargetYear && (
                <Typography variant="body2">
                  ✅ 年净收入目标 ({formatCurrency(data.incomeTarget)}) 将在第{' '}
                  {incomeTargetYear} 年达成
                </Typography>
              )}
              {savingsTargetYear && (
                <Typography variant="body2">
                  ✅ 总储蓄目标 ({formatCurrency(data.savingsTarget)}) 将在第{' '}
                  {savingsTargetYear} 年达成
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

        {/* 购买力分析 */}
        <AffordabilityCard
          itemName="300万美元别墅"
          itemPrice={VILLA_PRICE}
          affordability={affordability}
          currency={data.currency}
        />

        {/* 图表展示 */}
        <Box sx={{ mt: 4 }}>
          <ResultsCharts
            result={result}
            data={data}
            incomeTargetYear={incomeTargetYear}
            savingsTargetYear={savingsTargetYear}
            investmentPercentageTargetYear={investmentPercentageTargetYear}
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/step1')}
            size="large"
            sx={{ minHeight: 48 }}
            fullWidth
          >
            重新计算
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

