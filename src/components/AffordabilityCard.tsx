import { Paper, Typography, Box, SxProps, Theme } from '@mui/material'
import { calculateAffordability } from '../utils/calculator'

interface Props {
  itemName: string
  itemPrice: number
  affordability: ReturnType<typeof calculateAffordability>
  currency: 'USD' | 'CNY'
  locale: 'en-US' | 'zh-CN'
  sx?: SxProps<Theme>
}

export default function AffordabilityCard({
  itemName,
  itemPrice,
  affordability,
  currency,
  locale,
  sx,
}: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 1, md: 3 },
        mb: { xs: 1, md: 3 },
        bgcolor: 'primary.light',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: '0.9rem', md: '1.25rem' }, mb: { xs: 0.25, md: 0.35 } }}
        >
          💰 购买力分析：{itemName}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: { xs: 0.5, md: 2 }, opacity: 0.9, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
        >
          价格：{formatCurrency(itemPrice)}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {affordability.canAffordYear ? (
          <Box>
            <Typography variant="body1" sx={{ mb: 0.5, fontSize: { xs: '0.85rem', md: '1rem' } }}>
              🎉 你将在第 <strong>{affordability.canAffordYear}</strong> 年买得起这个{itemName}！
            </Typography>
            {affordability.canAffordMultiple.length > 0 && (
              <Box sx={{ mt: { xs: 0.5, md: 2 } }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 0.25, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                >
                  购买数量预测：
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {affordability.canAffordMultiple
                    .filter((_item, index) => index % 2 === 0) // 只显示部分年份，避免太多
                    .slice(0, 5)
                    .map((item) => (
                      <Typography
                        key={item.year}
                        variant="body2"
                        sx={{ opacity: 0.9, fontSize: { xs: '0.7rem', md: '0.875rem' } }}
                      >
                        第 {item.year} 年：可买 {item.count} 个
                      </Typography>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>
            😔 在预测的 {affordability.canAffordMultiple.length > 0 ? '期间' : '年份'}内，你可能还买不起这个
            {itemName}。
            <br />
            考虑增加投资回报率或提高收入！
          </Typography>
        )}
      </Box>
    </Paper>
  )
}

