import { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

export default function Step5Targets({ data, setData }: Props) {
  const navigate = useNavigate()
  const [incomeTarget, setIncomeTarget] = useState(data.incomeTarget.toString())
  const [savingsTarget, setSavingsTarget] = useState(data.savingsTarget.toString())
  const [investmentPercentageTarget, setInvestmentPercentageTarget] = useState(
    data.investmentPercentageTarget.toString()
  )

  const handleNext = () => {
    setData({
      ...data,
      incomeTarget: parseFloat(incomeTarget) || 0,
      savingsTarget: parseFloat(savingsTarget) || 0,
      investmentPercentageTarget: parseFloat(investmentPercentageTarget) || 0,
    })
    navigate('/step6')
  }

  const handleBack = () => {
    navigate('/step4')
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Stepper activeStep={4} sx={{ mb: 4, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          目标设置
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          设置你想要达到的财务目标（可选，用于在结果中标记）
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="年净收入目标"
            type="number"
            value={incomeTarget}
            onChange={(e) => setIncomeTarget(e.target.value)}
            inputProps={{ min: 0, step: 1000 }}
            helperText={`希望达到的年净收入目标 (${data.currency})`}
            fullWidth
          />

          <TextField
            label="总储蓄目标"
            type="number"
            value={savingsTarget}
            onChange={(e) => setSavingsTarget(e.target.value)}
            inputProps={{ min: 0, step: 10000 }}
            helperText={`希望达到的总储蓄目标 (${data.currency})`}
            fullWidth
          />

          <TextField
            label="投资收入占比目标"
            type="number"
            value={investmentPercentageTarget}
            onChange={(e) => setInvestmentPercentageTarget(e.target.value)}
            inputProps={{ min: 0, max: 100, step: 1 }}
            helperText="希望投资收入占总收入的百分比（例如：90 表示 90%）"
            fullWidth
            InputProps={{
              endAdornment: '%',
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2, flexWrap: 'wrap' }}>
            <Button onClick={handleBack} size="large" sx={{ minHeight: 48, flex: { xs: 1, sm: 'none' } }}>
              上一步
            </Button>
            <Button variant="contained" onClick={handleNext} size="large" sx={{ minHeight: 48, flex: { xs: 1, sm: 'none' } }}>
              查看结果
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

