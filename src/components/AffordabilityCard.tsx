import { Paper, Typography, Box } from '@mui/material'
import { calculateAffordability } from '../utils/calculator'

interface Props {
  itemName: string
  itemPrice: number
  affordability: ReturnType<typeof calculateAffordability>
  currency: 'USD' | 'CNY'
}

export default function AffordabilityCard({
  itemName,
  itemPrice,
  affordability,
  currency,
}: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
      <Typography variant="h6" gutterBottom>
        💰 购买力分析：{itemName}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
        价格：{formatCurrency(itemPrice)}
      </Typography>

      {affordability.canAffordYear ? (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            🎉 你将在第 <strong>{affordability.canAffordYear}</strong> 年买得起这个{itemName}！
          </Typography>
          {affordability.canAffordMultiple.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                购买数量预测：
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {affordability.canAffordMultiple
                  .filter((item, index) => index % 2 === 0) // 只显示部分年份，避免太多
                  .slice(0, 5)
                  .map((item) => (
                    <Typography key={item.year} variant="body2" sx={{ opacity: 0.9 }}>
                      第 {item.year} 年：可买 {item.count} 个
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body1">
          😔 在预测的 {affordability.canAffordMultiple.length > 0 ? '期间' : '年份'}内，你可能还买不起这个{itemName}。
          <br />
          考虑增加投资回报率或提高收入！
        </Typography>
      )}
    </Paper>
  )
}

