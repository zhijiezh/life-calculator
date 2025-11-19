import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material'
import { CalculatorData } from './types'
import DesktopExperience from './components/DesktopExperience'
import MobileExperience from './components/MobileExperience'

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

const createDefaultData = (): CalculatorData => ({
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
  dreamItemName: '梦想豪宅',
  dreamItemPrice: 3000000,
})

function App() {
  const [data, setData] = useState<CalculatorData>(() => createDefaultData())
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const handleReset = () => {
    setData(createDefaultData())
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isDesktop ? (
        <DesktopExperience data={data} setData={setData} />
      ) : (
        <MobileExperience data={data} setData={setData} onReset={handleReset} />
      )}
    </ThemeProvider>
  )
}

export default App

