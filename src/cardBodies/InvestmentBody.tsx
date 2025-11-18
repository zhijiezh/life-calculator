import { Box, TextField } from '@mui/material'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function InvestmentBody({ data, setData }: Props) {
  const percentage = (data.investmentReturnRate * 100).toFixed(1)

  const handleChange = (value: number) => {
    setData({
      ...data,
      investmentReturnRate: value / 100,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="年投资回报率"
        type="number"
        value={percentage}
        onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
        inputProps={{ min: 0, step: 0.1 }}
        helperText="投资每年产生的回报百分比（提示：历史平均股票市场年回报率约为 7-10%）"
        fullWidth
        InputProps={{
          endAdornment: '%',
        }}
      />
    </Box>
  )
}

