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
  Slider,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

export default function Step4Investment({ data, setData }: Props) {
  const navigate = useNavigate()
  const [investmentReturnRate, setInvestmentReturnRate] = useState(
    (data.investmentReturnRate * 100).toString()
  )

  const handleNext = () => {
    setData({
      ...data,
      investmentReturnRate: (parseFloat(investmentReturnRate) || 0) / 100,
    })
    navigate('/step5')
  }

  const handleBack = () => {
    navigate('/step3')
  }

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setInvestmentReturnRate(newValue.toString())
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Stepper activeStep={3} sx={{ mb: 4, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          投资设置
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          设置预期的年投资回报率
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography gutterBottom>
              年投资回报率: {investmentReturnRate}%
            </Typography>
            <Slider
              value={parseFloat(investmentReturnRate) || 0}
              onChange={handleSliderChange}
              min={0}
              max={100}
              step={0.1}
              marks={[
                { value: 0, label: '0%' },
                { value: 7, label: '7%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 50, label: '50%' },
              ]}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              提示：历史平均股票市场年回报率约为 7-10%
            </Typography>
          </Box>

          <TextField
            label="年投资回报率"
            type="number"
            value={investmentReturnRate}
            onChange={(e) => setInvestmentReturnRate(e.target.value)}
            inputProps={{ min: 0, max: 100, step: 0.1 }}
            helperText="投资每年产生的回报百分比"
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
              下一步：设置目标
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

