import { CalculatorData } from '../types'
import { lifeCalculator, findFirstYear, calculateAffordability } from '../utils/calculator'
import ResultsSummaryContent from '../components/ResultsSummaryContent'

interface Props {
  data: CalculatorData
}

export default function ResultsSummaryBody({ data }: Props) {
  const result = lifeCalculator(data)
  const affordability = calculateAffordability(result, data.dreamItemPrice)

  const incomeTargetYear = findFirstYear(result, 'netIncome', data.incomeTarget)
  const savingsTargetYear = findFirstYear(result, 'totalSavings', data.savingsTarget)
  const investmentPercentageTargetYear = findFirstYear(
    result,
    'investmentPercentage',
    data.investmentPercentageTarget
  )

  return (
    <ResultsSummaryContent
      result={result}
      data={data}
      incomeTargetYear={incomeTargetYear}
      savingsTargetYear={savingsTargetYear}
      investmentPercentageTargetYear={investmentPercentageTargetYear}
      affordability={affordability}
    />
  )
}
