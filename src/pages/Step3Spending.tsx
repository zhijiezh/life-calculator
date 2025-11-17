import { Container, Button, Stepper, Step, StepLabel, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import MobileCard from '../components/cardWrappers/MobileCard'
import SpendingBody from '../cardBodies/SpendingBody'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

export default function Step3Spending({ data, setData }: Props) {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate('/step4')
  }

  const handleBack = () => {
    navigate('/step2')
  }

  const header = (
    <Box>
      <Stepper activeStep={2} sx={{ mb: 2, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="h5">支出设置</Typography>
    </Box>
  )

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <MobileCard
        header={header}
        footer={
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
        <SpendingBody data={data} setData={setData} />
      </MobileCard>
    </Container>
  )
}

