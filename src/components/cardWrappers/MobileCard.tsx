import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'

interface MobileCardProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export default function MobileCard({ header, footer, children }: MobileCardProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 32px)', // 减去外层 Container 的 padding
        p: 2,
        gap: 2,
      }}
    >
      {header && <Box sx={{ flexShrink: 0 }}>{header}</Box>}
      <Box sx={{ flex: 1, pt: 2 }}>{children}</Box>
      {footer && (
        <Box sx={{ flexShrink: 0, pt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>{footer}</Box>
      )}
    </Paper>
  )
}

