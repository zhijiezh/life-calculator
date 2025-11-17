import { Box, Typography } from '@mui/material'
import { CalculatorData } from '../types'
import DesktopCard from './cardWrappers/DesktopCard'
import BasicInfoBody from '../cardBodies/BasicInfoBody'
import SalaryBody from '../cardBodies/SalaryBody'
import SpendingBody from '../cardBodies/SpendingBody'
import InvestmentBody from '../cardBodies/InvestmentBody'
import TargetsBody from '../cardBodies/TargetsBody'
import ResultsBody from '../cardBodies/ResultsBody'

interface DesktopExperienceProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function DesktopExperience({ data, setData }: DesktopExperienceProps) {
  const cardMap: Record<string, JSX.Element> = {
    basic: (
      <DesktopCard title="基础信息" description="设置预测范围与初始资产">
        <BasicInfoBody data={data} setData={setData} />
      </DesktopCard>
    ),
    salary: (
        <DesktopCard
          title="工资收入曲线"
          description="拖拽节点或输入数值，描绘未来收入变化"
        >
          <SalaryBody data={data} setData={setData} />
        </DesktopCard>
      ),
    spending: (
      <DesktopCard title="支出设置" description="每年的基础支出和通胀假设">
        <SpendingBody data={data} setData={setData} />
      </DesktopCard>
    ),
    investment: (
      <DesktopCard title="投资设置" description="设定预期的年投资回报率">
        <InvestmentBody data={data} setData={setData} />
      </DesktopCard>
    ),
    targets: (
      <DesktopCard title="目标设置" description="定义收入、储蓄与投资占比目标">
        <TargetsBody data={data} setData={setData} />
      </DesktopCard>
    ),
    results: (
        <DesktopCard title="结果预览" description="实时查看预测与图表">
          <ResultsBody data={data} />
        </DesktopCard>
      ),
  }

  const columnLayout: string[][] = [
    ['basic', 'spending', 'targets'],
    ['salary', 'investment'],
    ['results'],
  ]

  return (
    <Box sx={{ p: 4, maxWidth: 1600, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          人生计算器（桌面体验）
        </Typography>
        <Typography variant="body1" color="text.secondary">
          所有输入卡片集中呈现，随时调整并实时查看结果。
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {columnLayout.map((column, idx) => (
          <Box key={idx} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {column.map((cardId) => (
              <Box key={cardId}>{cardMap[cardId]}</Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

