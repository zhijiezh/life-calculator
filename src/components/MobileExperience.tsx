import { useState } from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { CalculatorData } from '../types'
import { cardConfigs } from '../config/cardConfig'
import WelcomeBody from '../cardBodies/WelcomeBody'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface MobileExperienceProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
  onReset: () => void
}

// 简单的 Swiper 组件
function SimpleSwiper({
  items,
  renderItem,
  height = '100%',
  locked = false,
  onIndexChange,
}: {
  items: any[]
  renderItem: (item: any) => React.ReactNode
  height?: string | number
  locked?: boolean
  onIndexChange?: (index: number) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    if (locked) return
    if (currentIndex < items.length - 1) {
      setDirection(1)
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      onIndexChange?.(newIndex)
    }
  }

  const handlePrev = () => {
    if (locked) return
    if (currentIndex > 0) {
      setDirection(-1)
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      onIndexChange?.(newIndex)
    }
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag={locked ? false : "x"}
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            if (locked) return
            const swipe = offset.x
            if (swipe < -50 || velocity.x < -500) {
              handleNext()
            } else if (swipe > 50 || velocity.x > 500) {
              handlePrev()
            }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            touchAction: 'pan-y',
          }}
        >
          {renderItem(items[currentIndex])}
        </motion.div>
      </AnimatePresence>

      {/* 导航指示器 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {items.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: idx === currentIndex ? 'primary.main' : 'action.disabled',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>

      {/* 左右箭头 (可选，辅助点击) */}
      {currentIndex > 0 && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.5)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
          }}
          size="small"
        >
          <ChevronLeftIcon />
        </IconButton>
      )}
      {currentIndex < items.length - 1 && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.5)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
          }}
          size="small"
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  )
}

export default function MobileExperience({ data, setData }: MobileExperienceProps) {
  // 跟踪下半屏访问过的最大进度（不可逆）
  const [maxInputProgress, setMaxInputProgress] = useState(0)
  const [isUnlocked, setIsUnlocked] = useState(false)

  // 1. 筛选卡片
  const chartCards = cardConfigs.filter((c) => c.category === 'chart' || c.category === 'summary')
  const inputCards = cardConfigs.filter((c) => c.category === 'input')

  // 2. 计算进度（基于访问过的最大页数，不可逆）
  const progress = inputCards.length > 0 ? ((maxInputProgress + 1) / inputCards.length) * 100 : 0
  
  // 3. 一旦达到100%，永久解锁
  if (progress >= 100 && !isUnlocked) {
    setIsUnlocked(true)
  }

  // 4. 处理下半屏index变化
  const handleInputIndexChange = (index: number) => {
    if (index > maxInputProgress) {
      setMaxInputProgress(index)
    }
  }

  // 5. 准备上半屏的items（包含Welcome页）
  const topItems = [
    { type: 'welcome', progress },
    ...chartCards.map((config) => ({ type: 'chart', config })),
  ]

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Top Section: Welcome + Charts */}
      <Box sx={{ height: '50%', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <SimpleSwiper
          items={topItems}
          locked={!isUnlocked}
          renderItem={(item) => {
            if (item.type === 'welcome') {
              return (
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WelcomeBody progress={item.progress} />
                </Box>
              )
            }
            return (
              <Box sx={{ width: '100%', height: '100%', p: 1.5, overflow: 'hidden' }}>
                <Box sx={{ flex: 1, height: 'calc(100% - 24px)', overflow: 'hidden' }}>
                  {item.config.component({ data, setData })}
                </Box>
              </Box>
            )
          }}
        />
      </Box>

      {/* Bottom Section: Inputs */}
      <Box sx={{ height: '50%', bgcolor: 'background.default' }}>
        <SimpleSwiper
          items={inputCards}
          onIndexChange={handleInputIndexChange}
          renderItem={(config) => (
            <Box sx={{ width: '100%', height: '100%', p: 1.5, overflowY: 'auto' }}>
              <Paper
                elevation={0}
                sx={{
                  px: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="subtitle2" gutterBottom color="primary" sx={{ mb: 1 }}>
                  {config.mobileTitle || config.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                  {config.description}
                </Typography>
                <Box sx={{ flex: 1, overflowY: 'auto'}}>{config.component({ data, setData })}</Box>
              </Paper>
            </Box>
          )}
        />
      </Box>
    </Box>
  )
}

