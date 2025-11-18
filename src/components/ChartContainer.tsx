import { Box, Paper, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface ChartContainerProps {
  title?: string
  children: ReactNode
}

/**
 * 可复用的图表容器组件
 * 提供统一的滚动行为和样式
 */
export default function ChartContainer({ title, children }: ChartContainerProps) {
  const content = (
    <Box 
      sx={{ 
        width: '100%', 
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      {children}
    </Box>
  )

  // 如果有 title，用 Paper 包裹
  if (title) {
    return (
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        {content}
      </Paper>
    )
  }

  // 没有 title，只返回 Box
  return content
}

