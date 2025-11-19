import { Box } from '@mui/material'
import { CalculatorData } from '../types'
import { lifeCalculator, findFirstYear, calculateAffordability } from '../utils/calculator'
import ResultsSummaryContent from '../components/ResultsSummaryContent'
import NetIncomeChart from './charts/NetIncomeChart'
import TotalSavingsChart from './charts/TotalSavingsChart'
import IncomeCompositionChart from './charts/IncomeCompositionChart'
import InvestmentPercentageChart from './charts/InvestmentPercentageChart'

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ResultsSummaryContent
        result={result}
        data={data}
        incomeTargetYear={incomeTargetYear}
        savingsTargetYear={savingsTargetYear}
        investmentPercentageTargetYear={investmentPercentageTargetYear}
        affordability={affordability}
      />

      <NetIncomeChart
        result={result}
        data={data}
        incomeTargetYear={incomeTargetYear}
      />

      <TotalSavingsChart
        result={result}
        data={data}
        savingsTargetYear={savingsTargetYear}
      />

      <IncomeCompositionChart result={result} data={data} />

      <InvestmentPercentageChart
        result={result}
        data={data}
        investmentPercentageTargetYear={investmentPercentageTargetYear}
      />
    </Box>
  )
}

