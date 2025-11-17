import { ReactNode } from 'react'
import { CalculatorData } from '../types'
import BasicInfoBody from '../cardBodies/BasicInfoBody'
import SalaryBody from '../cardBodies/SalaryBody'
import SpendingBody from '../cardBodies/SpendingBody'
import InvestmentBody from '../cardBodies/InvestmentBody'
import TargetsBody from '../cardBodies/TargetsBody'
import ResultsBody from '../cardBodies/ResultsBody'

export interface CardConfig {
  id: string
  title: string
  description: string
  mobileTitle?: string // 如果 mobile 需要不同的标题
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
 * - component: 卡片内容组件
 */
export const cardConfigs: CardConfig[] = [
  {
    id: 'basic',
    title: '基础信息',
    description: '设置预测范围与初始资产',
    component: (props) => <BasicInfoBody {...props} />,
  },
  {
    id: 'salary',
    title: '工资收入曲线',
    description: '拖拽节点或输入数值，描绘未来收入变化',
    mobileTitle: '工资收入',
    component: (props) => <SalaryBody {...props} />,
  },
  {
    id: 'spending',
    title: '支出设置',
    description: '每年的基础支出和通胀假设',
    component: (props) => <SpendingBody {...props} />,
  },
  {
    id: 'investment',
    title: '投资设置',
    description: '设定预期的年投资回报率',
    component: (props) => <InvestmentBody {...props} />,
  },
  {
    id: 'targets',
    title: '目标设置',
    description: '定义收入、储蓄与投资占比目标',
    component: (props) => <TargetsBody {...props} />,
  },
  {
    id: 'results',
    title: '结果预览',
    description: '实时查看预测与图表',
    mobileTitle: '查看结果',
    component: (props) => <ResultsBody {...props} />,
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
  ['salary', 'investment'],
  ['results'],
]

