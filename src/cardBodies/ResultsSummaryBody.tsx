import { CalculatorData } from '../types'
import { lifeCalculator, findFirstYear, calculateAffordability } from '../utils/calculator'
import ResultsSummaryContent from '../components/ResultsSummaryContent'

const VILLA_PRICE = 3000000

interface Props {
  data: CalculatorData
}

export default function ResultsSummaryBody({ data }: Props) {
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
