import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Step1BasicInfo from '../pages/Step1BasicInfo'
import Step2Salary from '../pages/Step2Salary'
import Step3Spending from '../pages/Step3Spending'
import Step4Investment from '../pages/Step4Investment'
import Step5Targets from '../pages/Step5Targets'
import Step6Results from '../pages/Step6Results'
import { CalculatorData } from '../types'

interface MobileExperienceProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function MobileExperience({ data, setData }: MobileExperienceProps) {
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/step1" replace />} />
          <Route path="/step1" element={<Step1BasicInfo data={data} setData={setData} />} />
          <Route path="/step2" element={<Step2Salary data={data} setData={setData} />} />
          <Route path="/step3" element={<Step3Spending data={data} setData={setData} />} />
          <Route path="/step4" element={<Step4Investment data={data} setData={setData} />} />
          <Route path="/step5" element={<Step5Targets data={data} setData={setData} />} />
          <Route path="/step6" element={<Step6Results data={data} />} />
      </Routes>
    </HashRouter>
  )
}

