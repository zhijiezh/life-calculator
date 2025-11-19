import { Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import NumberField from '../components/NumberField'
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
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

      <NumberField
        label="预测年数"
        defaultValue={data.years}
        onValueChange={(value: number | null) => {
          // 只在值不为 null 时更新外部状态
          if (value !== null) {
            setData({ ...data, years: value })
          }
        }}
        min={1}
        max={50}
        step={1}
        helperText="预测未来多少年的财务状况"
        fullWidth
      />
    </Box>
  )
}

