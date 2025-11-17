import { Grid, Box, Typography, Button } from '@mui/material'
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

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={6} lg={4}>
          <DesktopCard
            title="基础信息"
            description="设置预测范围与初始资产"
            actions={<Button variant="contained">保存</Button>}
          >
            <BasicInfoBody data={data} setData={setData} />
          </DesktopCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopCard
            title="工资收入曲线"
            description="拖拽节点或输入数值，描绘未来收入变化"
            actions={<Button variant="contained">保存</Button>}
          >
            <SalaryBody data={data} setData={setData} />
          </DesktopCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopCard
            title="支出设置"
            description="每年的基础支出和通胀假设"
            actions={<Button variant="contained">保存</Button>}
          >
            <SpendingBody data={data} setData={setData} />
          </DesktopCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopCard
            title="投资设置"
            description="设定预期的年投资回报率"
            actions={<Button variant="contained">保存</Button>}
          >
            <InvestmentBody data={data} setData={setData} />
          </DesktopCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopCard
            title="目标设置"
            description="定义收入、储蓄与投资占比目标"
            actions={<Button variant="contained">保存</Button>}
          >
            <TargetsBody data={data} setData={setData} />
          </DesktopCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopCard title="结果预览" description="实时查看预测与图表">
            <ResultsBody data={data} />
          </DesktopCard>
        </Grid>
      </Grid>
    </Box>
  )
}

