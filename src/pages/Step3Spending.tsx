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

export default function Step3Spending({ data, setData }: Props) {
  const navigate = useNavigate()
  const [baseSpending, setBaseSpending] = useState(data.baseSpending.toString())
  const [inflationRate, setInflationRate] = useState((data.inflationRate * 100).toString())

  const handleNext = () => {
    setData({
      ...data,
      baseSpending: parseFloat(baseSpending) || 0,
      inflationRate: (parseFloat(inflationRate) || 0) / 100,
    })
    navigate('/step4')
  }

  const handleBack = () => {
    navigate('/step2')
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Stepper activeStep={2} sx={{ mb: 4, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          支出设置
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          设置每年的基础支出和通货膨胀率
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="当前年支出"
            type="number"
            value={baseSpending}
            onChange={(e) => setBaseSpending(e.target.value)}
            inputProps={{ min: 0, step: 1000 }}
            helperText={`每年的基础支出金额 (${data.currency})`}
            fullWidth
          />

          <TextField
            label="年通货膨胀率"
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            inputProps={{ min: 0, max: 20, step: 0.1 }}
            helperText="支出每年增长的百分比（例如：3 表示每年增长 3%）"
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
              下一步：设置投资
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

