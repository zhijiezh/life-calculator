import { Box, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function BasicInfoBody({ data, setData }: Props) {
  const handleCurrencyChange = (value: 'USD' | 'CNY') => {
    setData({
      ...data,
      currency: value,
    })
  }

  const handleYearsChange = (value: string) => {
    const parsed = parseInt(value, 10)
    setData({
      ...data,
      years: isNaN(parsed) ? data.years : parsed,
    })
  }

  const handleSavingsChange = (value: string) => {
    const parsed = parseFloat(value)
    setData({
      ...data,
      initialSavings: isNaN(parsed) ? data.initialSavings : parsed,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>货币单位</InputLabel>
        <Select
          value={data.currency}
          label="货币单位"
          onChange={(e) => handleCurrencyChange(e.target.value as 'USD' | 'CNY')}
        >
          <MenuItem value="USD">USD (美元)</MenuItem>
          <MenuItem value="CNY" disabled>
            CNY (人民币) - 即将支持
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="预测年数"
        type="number"
        value={data.years}
        onChange={(e) => handleYearsChange(e.target.value)}
        inputProps={{ min: 1, max: 50 }}
        helperText="预测未来多少年的财务状况"
        fullWidth
      />

      <TextField
        label="初始存款"
        type="number"
        value={data.initialSavings}
        onChange={(e) => handleSavingsChange(e.target.value)}
        inputProps={{ min: 0, step: 1000 }}
        helperText={`当前已有的存款金额 (${data.currency})`}
        fullWidth
      />
    </Box>
  )
}

