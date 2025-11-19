import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactElement } from 'react'
import { ResponsiveContainer } from 'recharts'

interface ChartContainerProps {
  title?: string
  children: ReactElement
}

/**
 * 可复用的图表容器组件
 * 提供统一的滚动行为和样式
 * 自动检测移动端并调整高度和样式
 */
export default function ChartContainer({ title, children }: ChartContainerProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  // 根据设备类型设置高度配置
  const heightConfig = isMobile 
    ? { container: 'calc(50vh - 160px)', chart: '100%' }
    : { container: 'auto', chart: 380 }
  
  const content = (
    <Box 
      sx={{ 
        width: '100%', 
        height: heightConfig.container,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <ResponsiveContainer width="100%" height={heightConfig.chart} debounce={200}>
        {children}
      </ResponsiveContainer>
    </Box>
  )

  // 如果有 title 且不是移动端，用 Paper 包裹
  if (title) {
    return (
      <Paper variant="outlined" sx={{ pt: 2, px: 2, pb: 0, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        {content}
      </Paper>
    )
  }

  return content
}

