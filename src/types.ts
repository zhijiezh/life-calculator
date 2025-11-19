export interface CalculatorData {
  currency: 'USD' | 'CNY'
  years: number
  initialSavings: number
  salaryCurve: Array<{ year: number; salary: number }> // 工资曲线数据点
  baseSpending: number
  inflationRate: number // 通货膨胀率
  investmentReturnRate: number
  incomeTarget: number
  savingsTarget: number
  investmentPercentageTarget: number
  dreamItemName: string
  dreamItemPrice: number
}

export interface CalculationResult {
  years: number[]
  netIncome: number[]
  totalSavings: number[]
  investmentIncome: number[]
  salaryIncome: number[]
  spending: number[]
  savingWithoutInvestment: number[]
  totalIncomeFromSalary: number[]
  investmentPercentage: number[]
}

