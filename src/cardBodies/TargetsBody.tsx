import { Box, Slider, Typography } from '@mui/material'
import NumberField from '../components/NumberField'
import { CalculatorData } from '../types'

interface Props {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function TargetsBody({ data, setData }: Props) {
  const handlePercentageChange = (value: number) => {
    setData({
      ...data,
      investmentPercentageTarget: value,
    })
  }

  // 阻止 Slider 的指针事件冒泡，防止触发页面拖动
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    e.stopPropagation()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 , pt: 1}}>
            <NumberField
              label="年净收入目标"
              defaultValue={data.incomeTarget}
              onValueChange={(value: number | null) => {
                if (value !== null) {
                  setData({ ...data, incomeTarget: value })
                }
              }}
        min={0}
        step={1000}
        helperText={`希望达到的年净收入目标 (${data.currency})`}
        fullWidth
      />

            <NumberField
              label="总储蓄目标"
              defaultValue={data.savingsTarget}
              onValueChange={(value: number | null) => {
                if (value !== null) {
                  setData({ ...data, savingsTarget: value })
                }
              }}
        min={0}
        step={10000}
        helperText={`希望达到的总储蓄目标 (${data.currency})`}
        fullWidth
      />

      <Box
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <Typography gutterBottom>投资收入占比目标: {data.investmentPercentageTarget}%</Typography>
        <Box sx={{ px: 2.5 }}>
          <Slider
            value={data.investmentPercentageTarget}
            onChange={(_, val) => handlePercentageChange(val as number)}
            min={0}
            max={100}
            step={1}
            marks={[
              { value: 0, label: '0%' },
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
            ]}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          希望投资收入占总收入的百分比
        </Typography>
      </Box>
    </Box>
  )
}

