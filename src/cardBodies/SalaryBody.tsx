import { useEffect, useMemo } from 'react'
import SalaryCurveEditor from '../components/SalaryCurveEditor'
import { CalculatorData } from '../types'

interface SalaryBodyProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

const DEFAULT_CURVE = [
  { year: 1, salary: 120000 },
  { year: 5, salary: 200000 },
  { year: 10, salary: 300000 },
  { year: 15, salary: 400000 },
]

export default function SalaryBody({ data, setData }: SalaryBodyProps) {
  const points = useMemo(
    () => (data.salaryCurve.length ? data.salaryCurve : DEFAULT_CURVE),
    [data.salaryCurve]
  )

  useEffect(() => {
    if (!data.salaryCurve.length) {
      setData({
        ...data,
        salaryCurve: DEFAULT_CURVE,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (salaryCurve: CalculatorData['salaryCurve']) => {
    setData({
      ...data,
      salaryCurve,
    })
  }

  return (
    <SalaryCurveEditor
      years={data.years}
      currency={data.currency}
      locale={data.locale}
      points={points}
      onChange={handleChange}
    />
  )
}

