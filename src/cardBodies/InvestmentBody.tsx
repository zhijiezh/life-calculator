import { Box } from '@mui/material'
import NumberField from '../components/NumberField'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function InvestmentBody({ data, setData }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <NumberField
        label="年投资回报率"
        defaultValue={data.investmentReturnRate * 100}
        onValueChange={(value) => {
          if (value !== null) {
            setData({ ...data, investmentReturnRate: value / 100 })
          }
        }}
        min={0}
        step={0.1}
        helperText="投资每年产生的回报百分比（提示：历史平均股票市场年回报率约为 7-10%）"
        fullWidth
        endAdornment="%"
      />
    </Box>
  )
}

