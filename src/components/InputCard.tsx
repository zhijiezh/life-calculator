import { ReactNode } from 'react'
import { Card, CardHeader, CardContent, CardActions, Divider, Box } from '@mui/material'

interface InputCardProps {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

export default function InputCard({ title, description, actions, children }: InputCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={title} subheader={description} />
      <Divider />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </CardContent>
      {actions && (
        <>
          <Divider />
          <CardActions>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              {actions}
            </Box>
          </CardActions>
        </>
      )}
    </Card>
  )
}

