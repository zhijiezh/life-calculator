import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import SalaryCurveEditor from '../components/SalaryCurveEditor'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

export default function Step2Salary({ data, setData }: Props) {
  const navigate = useNavigate()
  const [salaryCurve, setSalaryCurve] = useState<Array<{ year: number; salary: number }>>(
    data.salaryCurve.length > 0
      ? data.salaryCurve
      : [
          { year: 1, salary: 120000 },
          { year: 5, salary: 200000 },
          { year: 10, salary: 300000 },
          { year: 15, salary: 400000 },
        ]
  )

  useEffect(() => {
    // 确保数据点不超过预测年数
    const filtered = salaryCurve.filter((point) => point.year <= data.years)
    if (filtered.length !== salaryCurve.length) {
      setSalaryCurve(filtered)
    }
  }, [data.years, salaryCurve])

  const handleNext = () => {
    setData({
      ...data,
      salaryCurve,
    })
    navigate('/step3')
  }

  const handleBack = () => {
    navigate('/step1')
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Stepper activeStep={1} sx={{ mb: 4, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          工资收入曲线
        </Typography>

        <Box sx={{ mb: 3 }}>
          <SalaryCurveEditor
            years={data.years}
            currency={data.currency}
            points={salaryCurve}
            onChange={setSalaryCurve}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <Button onClick={handleBack} size="large" sx={{ minHeight: 48, flex: { xs: 1, sm: 'none' } }}>
            上一步
          </Button>
          <Button variant="contained" onClick={handleNext} size="large" sx={{ minHeight: 48, flex: { xs: 1, sm: 'none' } }}>
            下一步：设置支出
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

