import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Step1BasicInfo from './pages/Step1BasicInfo'
import Step2Salary from './pages/Step2Salary'
import Step3Spending from './pages/Step3Spending'
import Step4Investment from './pages/Step4Investment'
import Step5Targets from './pages/Step5Targets'
import Step6Results from './pages/Step6Results'
import { CalculatorData } from './types'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

const defaultData: CalculatorData = {
  currency: 'USD',
  years: 15,
  initialSavings: 80000,
  salaryCurve: [],
  baseSpending: 100000,
  inflationRate: 0.03,
  investmentReturnRate: 0.2,
  incomeTarget: 1095000,
  savingsTarget: 3000000,
  investmentPercentageTarget: 90,
}

function App() {
  const [data, setData] = useState<CalculatorData>(defaultData)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/step1" replace />} />
          <Route
            path="/step1"
            element={<Step1BasicInfo data={data} setData={setData} />}
          />
          <Route
            path="/step2"
            element={<Step2Salary data={data} setData={setData} />}
          />
          <Route
            path="/step3"
            element={<Step3Spending data={data} setData={setData} />}
          />
          <Route
            path="/step4"
            element={<Step4Investment data={data} setData={setData} />}
          />
          <Route
            path="/step5"
            element={<Step5Targets data={data} setData={setData} />}
          />
          <Route
            path="/step6"
            element={<Step6Results data={data} />}
          />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App

