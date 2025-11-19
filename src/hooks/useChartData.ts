import { useMemo } from 'react'
import { CalculationResult } from '../types'

export function useChartData(result: CalculationResult) {
  return useMemo(
    () =>
      result.years.map((year, index) => ({
        year,
        netIncome: result.netIncome[index],
        totalSavings: result.totalSavings[index],
        investmentIncome: result.investmentIncome[index],
        salaryIncome: result.salaryIncome[index],
        spending: result.spending[index],
        savingWithoutInvestment: result.savingWithoutInvestment[index],
        investmentPercentage: result.investmentPercentage[index],
      })),
    [result]
  )
}
