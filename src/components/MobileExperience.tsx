import { useState } from 'react'
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Button, Container, Box } from '@mui/material'
import { CalculatorData } from '../types'
import MobileCard from './cardWrappers/MobileCard'
import MobileProgressHeader from './MobileProgressHeader'
import { cardConfigs } from '../config/cardConfig'

interface MobileExperienceProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
  onReset: () => void
}

// 从 cardConfigs 生成移动端步骤配置
const steps = cardConfigs
  .filter((config) => !config.hiddenOnMobile)
  .map((config) => ({
    path: `/step${cardConfigs.indexOf(config) + 1}`,
    title: config.mobileTitle || config.title,
    config,
  }))

function MobileStepWrapper({ data, setData, onReset }: MobileExperienceProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [direction, setDirection] = useState(1)

  const currentStepIndex = steps.findIndex((s) => s.path === location.pathname)
  const currentStep = currentStepIndex >= 0 ? currentStepIndex : 0
  const { title, config } = steps[currentStep]

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1) // 向左滑
      navigate(steps[currentStep + 1].path)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1) // 向右滑
      navigate(steps[currentStep - 1].path)
    }
  }

  const handleResetAndNavigate = () => {
    onReset()
    navigate('/step1', { replace: true })
  }

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50 // 降低阈值，更容易触发
    const swipeVelocity = 200 // 降低速度要求

    if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocity) {
      if (info.offset.x < 0) {
        // 向左拖 = 下一步
        if (!isLastStep) {
          setDirection(1)
          handleNext()
        }
      } else {
        // 向右拖 = 上一步
        if (!isFirstStep) {
          setDirection(-1)
          handleBack()
        }
      }
    }
  }

  const header = (
    <MobileProgressHeader currentStep={currentStep + 1} totalSteps={steps.length} title={title} />
  )

  const footer = isLastStep ? (
    <>
      <Button onClick={handleBack} size="large" sx={{ minHeight: 48, flex: 1 }}>
        返回上一步
      </Button>
      <Button variant="outlined" onClick={handleResetAndNavigate} size="large" sx={{ minHeight: 48, flex: 1 }}>
        重新开始
      </Button>
    </>
  ) : (
    <>
      {!isFirstStep && (
        <Button onClick={handleBack} size="large" sx={{ minHeight: 48, flex: 1 }}>
          上一步
        </Button>
      )}
      <Button variant="contained" onClick={handleNext} size="large" sx={{ minHeight: 48, flex: 1 }}>
        {isLastStep ? '查看结果' : '下一步'}
      </Button>
    </>
  )

  // 动画变体：根据导航方向决定滑动方向
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300, // 前进从右边进，后退从左边进
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300, // 前进向左出，后退向右出
      opacity: 0,
    }),
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          drag="x"
          dragDirectionLock
          dragElastic={0.5}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Container maxWidth="md" sx={{ flex: 1, py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 }, display: 'flex' }}>
              <MobileCard header={header} footer={footer}>
                {config.component({ data, setData })}
              </MobileCard>
            </Container>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}

export default function MobileExperience(props: MobileExperienceProps) {
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/step1" replace />} />
        <Route path="/*" element={<MobileStepWrapper {...props} />} />
      </Routes>
    </HashRouter>
  )
}

