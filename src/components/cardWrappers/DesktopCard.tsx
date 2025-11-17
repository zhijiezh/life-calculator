import { ReactNode } from 'react'
import { Card, CardHeader, CardContent, CardActions, Divider, Box, Typography } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface DesktopCardProps {
  id: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

export default function DesktopCard({ id, title, description, actions, children }: DesktopCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // 拖动时显示为占位符（保持原始内容的高度，但设为不可见）
  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'action.hover',
          border: '2px dashed',
          borderColor: 'primary.main',
          opacity: 0.4,
          visibility: 'hidden', // 隐藏内容但保持布局
          position: 'relative',
          '&::after': {
            content: '"放置到这里"',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            visibility: 'visible',
            color: 'text.secondary',
            fontSize: '0.875rem',
          },
        }}
      >
        <CardHeader title={title} subheader={description} />
        <Divider />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 3 }}>
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'grab',
        '&:hover': {
          boxShadow: 4,
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
      {...attributes}
      {...listeners}
    >
      <CardHeader title={title} subheader={description} />
      <Divider />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 3 }}>
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

