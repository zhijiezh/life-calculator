import { Box, TextField } from '@mui/material'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function TargetsBody({ data, setData }: Props) {
  const handleChange = (field: keyof CalculatorData) => (value: string) => {
    const parsed = parseFloat(value)
    setData({
      ...data,
      [field]: isNaN(parsed) ? data[field] : parsed,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="年净收入目标"
        type="number"
        value={data.incomeTarget}
        onChange={(e) => handleChange('incomeTarget')(e.target.value)}
        inputProps={{ min: 0, step: 1000 }}
        helperText={`希望达到的年净收入目标 (${data.currency})`}
        fullWidth
      />

      <TextField
        label="总储蓄目标"
        type="number"
        value={data.savingsTarget}
        onChange={(e) => handleChange('savingsTarget')(e.target.value)}
        inputProps={{ min: 0, step: 10000 }}
        helperText={`希望达到的总储蓄目标 (${data.currency})`}
        fullWidth
      />

      <TextField
        label="投资收入占比目标"
        type="number"
        value={data.investmentPercentageTarget}
        onChange={(e) => handleChange('investmentPercentageTarget')(e.target.value)}
        inputProps={{ min: 0, max: 100, step: 1 }}
        helperText="希望投资收入占总收入的百分比（例如：90 表示 90%）"
        fullWidth
        InputProps={{
          endAdornment: '%',
        }}
      />
    </Box>
  )
}

