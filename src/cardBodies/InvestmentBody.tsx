import { Box, Slider, TextField, Typography } from '@mui/material'
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

  // 阻止 Slider 的指针事件冒泡，防止触发页面拖动
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    e.stopPropagation()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <Typography gutterBottom>年投资回报率: {percentage}%</Typography>
        <Slider
          value={parseFloat(percentage)}
          onChange={(_, val) => handleChange(val as number)}
          min={0}
          max={100}
          step={0.1}
          marks={[
            { value: 0, label: '0%' },
            { value: 7, label: '7%' },
            { value: 10, label: '10%' },
            { value: 20, label: '20%' },
            { value: 50, label: '50%' },
          ]}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          提示：历史平均股票市场年回报率约为 7-10%
        </Typography>
      </Box>

      <TextField
        label="年投资回报率"
        type="number"
        value={percentage}
        onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
        inputProps={{ min: 0, max: 100, step: 0.1 }}
        helperText="投资每年产生的回报百分比"
        fullWidth
        InputProps={{
          endAdornment: '%',
        }}
      />
    </Box>
  )
}

