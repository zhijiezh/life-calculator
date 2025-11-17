import { CalculatorData, CalculationResult } from '../types'

/**
 * 根据工资曲线数据点生成完整的工资数组
 */
function generateSalaryArray(
  salaryCurve: Array<{ year: number; salary: number }>,
  years: number
): number[] {
  if (salaryCurve.length === 0) {
    return new Array(years).fill(0)
  }

  const salaryArr = new Array(years).fill(0)
  
  // 按年份排序
  const sortedCurve = [...salaryCurve].sort((a, b) => a.year - b.year)
  
  // 填充第一年
  if (sortedCurve[0].year === 1) {
    salaryArr[0] = sortedCurve[0].salary
  }
  
  // 线性插值填充中间年份
  for (let i = 0; i < sortedCurve.length - 1; i++) {
    const start = sortedCurve[i]
    const end = sortedCurve[i + 1]
    const startIdx = start.year - 1
    const endIdx = end.year - 1
    
    for (let j = startIdx; j <= endIdx && j < years; j++) {
      if (j === startIdx) {
        salaryArr[j] = start.salary
      } else if (j === endIdx) {
        salaryArr[j] = end.salary
      } else {
        // 线性插值
        const ratio = (j - startIdx) / (endIdx - startIdx)
        salaryArr[j] = start.salary + (end.salary - start.salary) * ratio
      }
    }
  }
  
  // 如果最后一年之后还有年份，使用最后一个值
  const lastPoint = sortedCurve[sortedCurve.length - 1]
  for (let i = lastPoint.year; i < years; i++) {
    salaryArr[i] = lastPoint.salary
  }
  
  return salaryArr
}

/**
 * 生成支出数组（考虑通货膨胀）
 */
function generateSpendingArray(
  baseSpending: number,
  inflationRate: number,
  years: number
): number[] {
  const spendingArr = new Array(years)
  for (let i = 0; i < years; i++) {
    spendingArr[i] = baseSpending * Math.pow(1 + inflationRate, i)
  }
  return spendingArr
}

/**
 * 主计算函数
 */
export function lifeCalculator(data: CalculatorData): CalculationResult {
  const { years, initialSavings, salaryCurve, baseSpending, inflationRate, investmentReturnRate } = data

  const salaryArr = generateSalaryArray(salaryCurve, years)
  const spendingArr = generateSpendingArray(baseSpending, inflationRate, years)

  const yearsArray = Array.from({ length: years }, (_, i) => i + 1)
  const savings = new Array(years).fill(0)
  const netIncome = new Array(years).fill(0)
  const investmentIncome = new Array(years).fill(0)

  savings[0] = initialSavings

  for (let i = 0; i < years; i++) {
    const salary = salaryArr[i]
    const spending = spendingArr[i]

    const previousSavings = i > 0 ? savings[i - 1] : initialSavings
    investmentIncome[i] = previousSavings * investmentReturnRate

    netIncome[i] = salary + investmentIncome[i] - spending
    savings[i] = previousSavings + netIncome[i]
  }

  // 计算累计值
  const savingWithoutInvestment = new Array(years).fill(0)
  const totalIncomeFromSalary = new Array(years).fill(0)
  const investmentPercentage = new Array(years).fill(0)

  let cumulativeSaving = 0
  let cumulativeSalary = 0

  for (let i = 0; i < years; i++) {
    cumulativeSaving += salaryArr[i] - spendingArr[i]
    savingWithoutInvestment[i] = cumulativeSaving

    cumulativeSalary += salaryArr[i]
    totalIncomeFromSalary[i] = cumulativeSalary

    const totalIncome = investmentIncome[i] + salaryArr[i]
    investmentPercentage[i] = totalIncome > 0 
      ? (investmentIncome[i] / totalIncome) * 100 
      : 0
  }

  return {
    years: yearsArray,
    netIncome,
    totalSavings: savings,
    investmentIncome,
    salaryIncome: salaryArr,
    spending: spendingArr,
    savingWithoutInvestment,
    totalIncomeFromSalary,
    investmentPercentage,
  }
}

/**
 * 找到首次达到目标的年份
 */
export function findFirstYear(
  result: CalculationResult,
  column: keyof CalculationResult,
  threshold: number
): number | null {
  const values = result[column] as number[]
  for (let i = 0; i < values.length; i++) {
    if (values[i] >= threshold) {
      return result.years[i]
    }
  }
  return null
}

/**
 * 计算购买力：多少年后能买得起某个物品
 */
export function calculateAffordability(
  result: CalculationResult,
  itemPrice: number
): {
  canAffordYear: number | null
  canAffordMultiple: Array<{ year: number; count: number }>
} {
  const canAffordYear = findFirstYear(result, 'totalSavings', itemPrice)
  
  const canAffordMultiple: Array<{ year: number; count: number }> = []
  for (let i = 0; i < result.years.length; i++) {
    const count = Math.floor(result.totalSavings[i] / itemPrice)
    if (count > 0) {
      canAffordMultiple.push({
        year: result.years[i],
        count,
      })
    }
  }

  return {
    canAffordYear,
    canAffordMultiple,
  }
}

