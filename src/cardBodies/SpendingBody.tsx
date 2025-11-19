import { Box } from '@mui/material'
import NumberField from '../components/NumberField'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function SpendingBody({ data, setData }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1, pb: 3 }}>
            <NumberField
              label="当前年支出"
              defaultValue={data.baseSpending}
              onValueChange={(value: number | null) => {
                if (value !== null) {
                  setData({ ...data, baseSpending: value })
                }
              }}
        min={0}
        step={1000}
        helperText={`每年的基础支出金额 (${data.currency})`}
        fullWidth
      />

            <NumberField
              label="年通货膨胀率"
              defaultValue={data.inflationRate * 100}
              onValueChange={(value: number | null) => {
                if (value !== null) {
                  setData({ ...data, inflationRate: value / 100 })
                }
              }}
        min={0}
        max={20}
        step={0.1}
        helperText="支出每年增长的百分比（例如：3 表示每年增长 3%）"
        fullWidth
        endAdornment="%"
      />
    </Box>
  )
}

