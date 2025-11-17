import { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

export default function Step1BasicInfo({ data, setData }: Props) {
  const navigate = useNavigate()
  const [currency, setCurrency] = useState<'USD' | 'CNY'>(data.currency)
  const [years, setYears] = useState(data.years.toString())
  const [initialSavings, setInitialSavings] = useState(data.initialSavings.toString())

  const handleNext = () => {
    setData({
      ...data,
      currency,
      years: parseInt(years) || 15,
      initialSavings: parseFloat(initialSavings) || 0,
    })
    navigate('/step2')
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Stepper activeStep={0} sx={{ mb: 4, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          基础信息
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          设置计算的基本参数
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>货币单位</InputLabel>
            <Select
              value={currency}
              label="货币单位"
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'CNY')}
            >
              <MenuItem value="USD">USD (美元)</MenuItem>
              <MenuItem value="CNY" disabled>
                CNY (人民币) - 即将支持
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="预测年数"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            inputProps={{ min: 1, max: 50 }}
            helperText="预测未来多少年的财务状况"
            fullWidth
          />

          <TextField
            label="初始存款"
            type="number"
            value={initialSavings}
            onChange={(e) => setInitialSavings(e.target.value)}
            inputProps={{ min: 0, step: 1000 }}
            helperText={`当前已有的存款金额 (${currency})`}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            fullWidth
            sx={{ mt: 2, minHeight: 48 }}
          >
            下一步：设置工资收入
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

