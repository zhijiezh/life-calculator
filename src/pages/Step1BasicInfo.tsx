import { Container, Paper, Stepper, Step, StepLabel, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import BasicInfoBody from '../cardBodies/BasicInfoBody'
import MobileCard from '../components/cardWrappers/MobileCard'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

export default function Step1BasicInfo({ data, setData }: Props) {
  const navigate = useNavigate()

  const handleNext = () => navigate('/step2')

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
        <MobileCard
          bottomBoxProps={{ sx: { display: { xs: 'flex', lg: 'none' } } }}
          bottomActions={
            <Button variant="contained" size="large" sx={{ minHeight: 48, flex: 1 }} onClick={handleNext}>
              下一步
            </Button>
          }
        >
          <BasicInfoBody data={data} setData={setData} />
        </MobileCard>
      </Paper>
    </Container>
  )
}

