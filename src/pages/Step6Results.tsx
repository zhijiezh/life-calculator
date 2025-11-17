import { Container, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CalculatorData } from '../types'
import ResultsBody from '../cardBodies/ResultsBody'

interface Props {
  data: CalculatorData
}

export default function Step6Results({ data }: Props) {
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
        <ResultsBody data={data} />

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/step5')}
            size="large"
            sx={{ minHeight: 48 }}
            fullWidth
          >
            返回上一步
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

