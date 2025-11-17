import { Container, Button, Stepper, Step, StepLabel, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import ResultsBody from '../cardBodies/ResultsBody'
import MobileCard from '../components/cardWrappers/MobileCard'

const steps = ['基础信息', '工资收入', '支出设置', '投资设置', '目标设置', '查看结果']

interface Props {
  data: CalculatorData
}

export default function Step6Results({ data }: Props) {
  const navigate = useNavigate()
  const header = (
    <Box>
      <Stepper activeStep={5} sx={{ mb: 2, '& .MuiStepLabel-label': { fontSize: { xs: '0.75rem', sm: '0.875rem' } } }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="h5">结果预览</Typography>
    </Box>
  )

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <MobileCard
        header={header}
        footer={
          <Button variant="outlined" onClick={() => navigate('/step5')} size="large" sx={{ minHeight: 48, flex: 1 }}>
            返回上一步
          </Button>
        }
      >
        <ResultsBody data={data} />
      </MobileCard>
    </Container>
  )
}

