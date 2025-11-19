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
  // 与 App.tsx 保持一致，lg 以上为桌面端
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = !isDesktop

  // 移动端：使用 Flex 布局填充父容器，自带边框和标题
  if (isMobile) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {title && (
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>
        )}
        <Box sx={{ flex: 1, minHeight: 0, width: '100%' }}>
          <ResponsiveContainer width="100%" height="112%" debounce={200}>
            {children}
          </ResponsiveContainer>
        </Box>
      </Paper>
    )
  }

  // 桌面端：只渲染图表内容，边框和标题由 DesktopCard 提供
  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <ResponsiveContainer width="100%" height={380} debounce={200}>
        {children}
      </ResponsiveContainer>
    </Box>
  )
}

