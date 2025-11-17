import { Box, Typography, LinearProgress } from '@mui/material'

interface MobileProgressHeaderProps {
  currentStep: number
  totalSteps: number
  title: string
}

export default function MobileProgressHeader({ currentStep, totalSteps, title }: MobileProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          步骤 {currentStep}/{totalSteps}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 6, borderRadius: 1 }} />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
    </Box>
  )
}

