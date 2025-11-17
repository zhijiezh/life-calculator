import { useState, useEffect } from 'react'
import { Box, TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material'
import InputCard from '../components/InputCard'
import { CalculatorData } from '../types'

interface BasicInfoCardProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
  onNext?: () => void
}

export default function BasicInfoCard({ data, setData, onNext }: BasicInfoCardProps) {
  const [currency, setCurrency] = useState<'USD' | 'CNY'>(data.currency)
  const [years, setYears] = useState(data.years.toString())
  const [initialSavings, setInitialSavings] = useState(data.initialSavings.toString())

  useEffect(() => {
    setCurrency(data.currency)
    setYears(data.years.toString())
    setInitialSavings(data.initialSavings.toString())
  }, [data])

  const handleSave = () => {
    setData({
      ...data,
      currency,
      years: parseInt(years) || 15,
      initialSavings: parseFloat(initialSavings) || 0,
    })
    onNext?.()
  }

  return (
    <InputCard
      title="基础信息"
      description="设置预测范围与初始资产"
      actions={
        <Button variant="contained" onClick={handleSave}>
          保存
        </Button>
      }
    >
      <FormControl fullWidth>
        <InputLabel>货币单位</InputLabel>
        <Select
          value={currency}
          label="货币单位"
          onChange={(e) => setCurrency(e.target.value as 'USD' | 'CNY')}
        >
          <MenuItem value="USD">USD (美元)</MenuItem>
          <MenuItem value="CNY" disabled>
            CNY (人民币) - 即将支持
          </MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="预测年数"
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          inputProps={{ min: 1, max: 50 }}
          helperText="预测未来多少年的财务状况"
          fullWidth
        />

        <TextField
          label="初始存款"
          type="number"
          value={initialSavings}
          onChange={(e) => setInitialSavings(e.target.value)}
          inputProps={{ min: 0, step: 1000 }}
          helperText={`当前已有的存款金额 (${currency})`}
          fullWidth
        />
      </Box>
    </InputCard>
  )
}

