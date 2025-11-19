import { Box, Typography, CircularProgress } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface Props {
  progress: number // 0-100
}

export default function WelcomeBody({ progress }: Props) {
  const isComplete = progress >= 100

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        px: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        你知道你的未来么？
      </Typography>

      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          thickness={4}
          sx={{
            color: isComplete ? 'success.main' : 'primary.main',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isComplete ? (
            <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main' }} />
          ) : (
            <LockIcon sx={{ fontSize: 48, color: 'action.disabled' }} />
          )}
        </Box>
      </Box>

      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        {isComplete
          ? '🎉 完成设置！向右滑动查看你的未来'
          : `完成下方设置以解锁 (${Math.round(progress)}%)`}
      </Typography>
    </Box>
  )
}

