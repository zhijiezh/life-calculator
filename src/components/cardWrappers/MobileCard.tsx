import { ReactNode } from 'react'
import { Box, Divider, BoxProps } from '@mui/material'

interface MobileCardProps {
  topActions?: ReactNode
  bottomActions?: ReactNode
  bottomBoxProps?: BoxProps
  children: ReactNode
}

export default function MobileCard({ topActions, bottomActions, bottomBoxProps, children }: MobileCardProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {topActions}
      <Box>{children}</Box>
      {bottomActions && (
        <>
          <Divider />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }} {...bottomBoxProps}>
            {bottomActions}
          </Box>
        </>
      )}
    </Box>
  )
}

