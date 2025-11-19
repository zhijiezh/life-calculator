import { ReactNode } from 'react'
import { CalculatorData } from '../types'
import BasicInfoBody from '../cardBodies/BasicInfoBody'
import SalaryBody from '../cardBodies/SalaryBody'
import SpendingBody from '../cardBodies/SpendingBody'
import InvestmentBody from '../cardBodies/InvestmentBody'
import TargetsBody from '../cardBodies/TargetsBody'
import ResultsSummaryBody from '../cardBodies/ResultsSummaryBody'
import NetIncomeChart from '../cardBodies/charts/NetIncomeChart'
import TotalSavingsChart from '../cardBodies/charts/TotalSavingsChart'
import IncomeCompositionChart from '../cardBodies/charts/IncomeCompositionChart'
import InvestmentPercentageChart from '../cardBodies/charts/InvestmentPercentageChart'
import { lifeCalculator, findFirstYear } from '../utils/calculator'

export interface CardConfig {
  id: string
  title: string
  description: string
  mobileTitle?: string // 如果 mobile 需要不同的标题
  category: 'input' | 'chart' | 'summary'
  component: (props: CardBodyProps) => ReactNode
}

export interface CardBodyProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

/**
 * 卡片配置数组
 * - 修改这里来调整卡片顺序、添加/删除卡片
 * - id: 唯一标识符，用于拖放和路由
 * - title: 桌面端和移动端的标题
 * - description: 桌面端的副标题
 * - mobileTitle: (可选) 移动端专用标题，不提供则使用 title
 * - category: 卡片类型，用于移动端分屏布局
 * - component: 卡片内容组件
 */
export const cardConfigs: CardConfig[] = [
  {
    id: 'basic',
    title: '基础信息',
    description: '设置预测范围与初始资产',
    category: 'input',
    component: (props) => <BasicInfoBody {...props} />,
  },
  {
    id: 'salary',
    title: '工资收入曲线',
    description: '拖拽节点或输入数值，描绘未来收入变化',
    mobileTitle: '工资收入',
    category: 'input',
    component: (props) => <SalaryBody {...props} />,
  },
  {
    id: 'spending',
    title: '支出设置',
    description: '每年的基础支出和通胀假设',
    category: 'input',
    component: (props) => <SpendingBody {...props} />,
  },
  {
    id: 'investment',
    title: '投资设置',
    description: '设定预期的年投资回报率',
    category: 'input',
    component: (props) => <InvestmentBody {...props} />,
  },
  {
    id: 'targets',
    title: '目标设置',
    description: '定义收入、储蓄与投资占比目标',
    category: 'input',
    component: (props) => <TargetsBody {...props} />,
  },
  {
    id: 'results_summary',
    title: '结果概览',
    description: '核心指标与目标达成情况',
    category: 'summary',
    component: (props) => <ResultsSummaryBody {...props} />,
  },
  {
    id: 'chart_net_income',
    title: '年净收入趋势',
    description: '每年净收入的变化趋势',
    category: 'chart',
    component: (props) => {
      const result = lifeCalculator(props.data)
      const incomeTargetYear = findFirstYear(result, 'netIncome', props.data.incomeTarget)
      return <NetIncomeChart result={result} data={props.data} incomeTargetYear={incomeTargetYear} />
    },
  },
  {
    id: 'chart_total_savings',
    title: '总储蓄对比',
    description: '有投资与无投资的总储蓄对比',
    category: 'chart',
    component: (props) => {
      const result = lifeCalculator(props.data)
      const savingsTargetYear = findFirstYear(result, 'totalSavings', props.data.savingsTarget)
      return <TotalSavingsChart result={result} data={props.data} savingsTargetYear={savingsTargetYear} />
    },
  },
  {
    id: 'chart_income_composition',
    title: '收入构成',
    description: '工资收入、投资收入与支出的构成',
    category: 'chart',
    component: (props) => {
      const result = lifeCalculator(props.data)
      return <IncomeCompositionChart result={result} data={props.data} />
    },
  },
  {
    id: 'chart_investment_percentage',
    title: '投资收入占比',
    description: '投资收入占总收入的比例趋势',
    category: 'chart',
    component: (props) => {
      const result = lifeCalculator(props.data)
      const investmentPercentageTargetYear = findFirstYear(
        result,
        'investmentPercentage',
        props.data.investmentPercentageTarget
      )
      return (
        <InvestmentPercentageChart
          result={result}
          data={props.data}
          investmentPercentageTargetYear={investmentPercentageTargetYear}
        />
      )
    },
  },
]

/**
 * 桌面端初始布局配置
 * - 每个数组代表一列
 * - 数组中的字符串是卡片的 id
 * - 修改这里来调整桌面端的初始布局
 */
export const desktopInitialLayout: string[][] = [
  ['basic', 'spending', 'targets'],
  ['salary', 'investment', 'results_summary'],
  ['chart_net_income', 'chart_total_savings', 'chart_income_composition', 'chart_investment_percentage'],
]

