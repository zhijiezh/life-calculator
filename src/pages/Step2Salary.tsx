import { Container, Paper, Button, Stepper, Step, StepLabel } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import MobileCard from '../components/cardWrappers/MobileCard'
import SalaryBody from '../cardBodies/SalaryBody'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

export default function Step2Salary({ data, setData }: Props) {
  const navigate = useNavigate()

  const handleNext = () => navigate('/step3')

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
        <MobileCard
          topActions={
            <Button onClick={handleBack} size="large" sx={{ display: { xs: 'inline-flex', lg: 'none' } }}>
              上一步
            </Button>
          }
          bottomBoxProps={{ sx: { display: { xs: 'flex', lg: 'none' } } }}
          bottomActions={
            <>
              <Button onClick={handleBack} size="large" sx={{ minHeight: 48, flex: 1 }}>
                上一步
              </Button>
              <Button variant="contained" onClick={handleNext} size="large" sx={{ minHeight: 48, flex: 1 }}>
                下一步
              </Button>
            </>
          }
        >
          <SalaryBody data={data} setData={setData} />
        </MobileCard>

      </Paper>
    </Container>
  )
}

