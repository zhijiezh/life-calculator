import { Box, TextField } from '@mui/material'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function SpendingBody({ data, setData }: Props) {
  const handleBaseChange = (value: string) => {
    const parsed = parseFloat(value)
    setData({
      ...data,
      baseSpending: isNaN(parsed) ? data.baseSpending : parsed,
    })
  }

  const handleInflationChange = (value: string) => {
    const parsed = parseFloat(value)
    setData({
      ...data,
      inflationRate: isNaN(parsed) ? data.inflationRate : parsed / 100,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="当前年支出"
        type="number"
        value={data.baseSpending}
        onChange={(e) => handleBaseChange(e.target.value)}
        inputProps={{ min: 0, step: 1000 }}
        helperText={`每年的基础支出金额 (${data.currency})`}
        fullWidth
      />

      <TextField
        label="年通货膨胀率"
        type="number"
        value={(data.inflationRate * 100).toString()}
        onChange={(e) => handleInflationChange(e.target.value)}
        inputProps={{ min: 0, max: 20, step: 0.1 }}
        helperText="支出每年增长的百分比（例如：3 表示每年增长 3%）"
        fullWidth
        InputProps={{
          endAdornment: '%',
        }}
      />
    </Box>
  )
}

