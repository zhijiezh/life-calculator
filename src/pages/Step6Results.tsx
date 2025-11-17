import { Container, Paper, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import ResultsBody from '../cardBodies/ResultsBody'
import MobileCard from '../components/cardWrappers/MobileCard'

interface Props {
  data: CalculatorData
}

export default function Step6Results({ data }: Props) {
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
        <MobileCard
          bottomBoxProps={{ sx: { display: { xs: 'flex', lg: 'none' }, mt: 2 } }}
          bottomActions={
            <Button variant="outlined" onClick={() => navigate('/step5')} size="large" sx={{ minHeight: 48, flex: 1 }}>
              返回上一步
            </Button>
          }
        >
          <ResultsBody data={data} />
        </MobileCard>

        <Box sx={{ mt: 4, display: { xs: 'none', lg: 'flex' }, gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/step5')} size="large" sx={{ minHeight: 48 }} fullWidth>
            返回上一步
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

