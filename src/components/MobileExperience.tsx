import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Container } from '@mui/material'
import { CalculatorData } from '../types'
import MobileCard from './cardWrappers/MobileCard'
import MobileProgressHeader from './MobileProgressHeader'
import BasicInfoBody from '../cardBodies/BasicInfoBody'
import SalaryBody from '../cardBodies/SalaryBody'
import SpendingBody from '../cardBodies/SpendingBody'
import InvestmentBody from '../cardBodies/InvestmentBody'
import TargetsBody from '../cardBodies/TargetsBody'
import ResultsBody from '../cardBodies/ResultsBody'

interface MobileExperienceProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
  onReset: () => void
}

const steps = [
  { path: '/step1', title: '基础信息', Component: BasicInfoBody },
  { path: '/step2', title: '工资收入', Component: SalaryBody },
  { path: '/step3', title: '支出设置', Component: SpendingBody },
  { path: '/step4', title: '投资设置', Component: InvestmentBody },
  { path: '/step5', title: '目标设置', Component: TargetsBody },
  { path: '/step6', title: '查看结果', Component: ResultsBody },
]

function MobileStepWrapper({ data, setData, onReset }: MobileExperienceProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const currentStepIndex = steps.findIndex((s) => s.path === location.pathname)
  const currentStep = currentStepIndex >= 0 ? currentStepIndex : 0
  const { title, Component } = steps[currentStep]

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      navigate(steps[currentStep + 1].path)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      navigate(steps[currentStep - 1].path)
    }
  }

  const handleResetAndNavigate = () => {
    onReset()
    navigate('/step1', { replace: true })
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isLastStep) handleNext()
    },
    onSwipedRight: () => {
      if (!isFirstStep) handleBack()
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
  })

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
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1, sm: 2 }, overflow: 'hidden' }} {...swipeHandlers}>
      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={location.pathname}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <MobileCard header={header} footer={footer}>
            <Component data={data} setData={setData} />
          </MobileCard>
        </motion.div>
      </AnimatePresence>
    </Container>
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

