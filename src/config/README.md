# 卡片配置说明

## 概览

本项目使用配置驱动的架构，所有卡片的配置集中在 `cardConfig.tsx` 文件中。这使得添加、删除、重新排序卡片变得非常简单。

## 文件结构

```
src/
├── config/
│   └── cardConfig.tsx      # 🎯 卡片配置中心（在这里修改）
├── cardBodies/             # 卡片内容组件
│   ├── BasicInfoBody.tsx
│   ├── SalaryBody.tsx
│   ├── SpendingBody.tsx
│   ├── InvestmentBody.tsx
│   ├── TargetsBody.tsx
│   └── ResultsBody.tsx
└── components/
    ├── DesktopExperience.tsx  # 桌面端（自动读取配置）
    └── MobileExperience.tsx   # 移动端（自动读取配置）
```

## 如何添加新卡片

### 步骤 1：创建卡片内容组件

在 `src/cardBodies/` 目录下创建新组件，例如 `NewFeatureBody.tsx`：

```typescript
import { TextField } from '@mui/material'
import { CalculatorData } from '../types'

interface NewFeatureBodyProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function NewFeatureBody({ data, setData }: NewFeatureBodyProps) {
  return (
    <TextField
      label="新功能"
      value={data.someNewField}
      onChange={(e) => setData({ ...data, someNewField: e.target.value })}
      fullWidth
    />
  )
}
```

### 步骤 2：在配置文件中注册

打开 `src/config/cardConfig.tsx`，在 `cardConfigs` 数组中添加新卡片：

```typescript
import NewFeatureBody from '../cardBodies/NewFeatureBody'

export const cardConfigs: CardConfig[] = [
  // ... 其他卡片
  {
    id: 'newfeature',              // 唯一标识符
    title: '新功能',                // 桌面和移动端标题
    description: '这是新功能描述',   // 桌面端副标题
    mobileTitle: '新功能',          // (可选) 移动端专用标题
    component: (props) => <NewFeatureBody {...props} />,
  },
]
```

**就这样！** 新卡片会自动出现在桌面端和移动端。

## 如何调整卡片顺序

### 移动端顺序

直接在 `cardConfigs` 数组中调整元素顺序，移动端步骤会自动按顺序显示。

```typescript
export const cardConfigs: CardConfig[] = [
  { id: 'basic', ... },
  { id: 'salary', ... },
  { id: 'spending', ... },  // ← 移动这行来改变顺序
  { id: 'investment', ... },
  { id: 'targets', ... },
  { id: 'results', ... },
]
```

### 桌面端初始布局

修改 `desktopInitialLayout` 来调整桌面端的列布局：

```typescript
export const desktopInitialLayout: string[][] = [
  ['basic', 'spending', 'targets'],  // 第一列
  ['salary', 'investment'],          // 第二列
  ['results'],                       // 第三列
]
```

- 每个数组代表一列
- 数组内的字符串是卡片的 `id`
- 用户可以在运行时通过拖放重新排列

## 如何删除卡片

1. 从 `cardConfigs` 数组中删除对应的配置对象
2. 从 `desktopInitialLayout` 中删除对应的 `id`
3. （可选）删除 `src/cardBodies/` 中不再使用的组件文件

## 配置字段说明

```typescript
interface CardConfig {
  id: string              // 唯一标识符，用于拖放和路由
  title: string           // 桌面和移动端的标题
  description: string     // 桌面端的副标题（在标题下方显示）
  mobileTitle?: string    // (可选) 移动端专用标题，不提供则使用 title
  component: (props: CardBodyProps) => ReactNode  // 卡片内容组件
}
```

## 自动化特性

- ✅ **移动端路由自动生成**：`/step1`, `/step2`, ... 根据 `cardConfigs` 顺序自动创建
- ✅ **进度条自动更新**：移动端进度条根据 `cardConfigs` 长度自动计算
- ✅ **桌面端拖放**：用户可以实时重新排列卡片，无需修改代码
- ✅ **类型安全**：TypeScript 确保所有配置正确

## 示例：添加一个新图表卡片

假设你想添加一个新的图表卡片来显示投资增长曲线。

### 1. 创建组件 `src/cardBodies/InvestmentGrowthBody.tsx`

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CalculatorData } from '../types'
import { lifeCalculator } from '../utils/calculator'

interface InvestmentGrowthBodyProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

export default function InvestmentGrowthBody({ data }: InvestmentGrowthBodyProps) {
  const results = lifeCalculator(data)
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={results}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalInvestment" stroke="#8884d8" name="投资总额" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

### 2. 在 `cardConfig.tsx` 中注册

```typescript
import InvestmentGrowthBody from '../cardBodies/InvestmentGrowthBody'

export const cardConfigs: CardConfig[] = [
  // ... 其他卡片
  {
    id: 'investmentgrowth',
    title: '投资增长曲线',
    description: '可视化投资随时间的增长趋势',
    component: (props) => <InvestmentGrowthBody {...props} />,
  },
]

// 添加到桌面端布局的第三列
export const desktopInitialLayout: string[][] = [
  ['basic', 'spending', 'targets'],
  ['salary', 'investment'],
  ['results', 'investmentgrowth'],  // ← 添加到这里
]
```

完成！新图表会出现在桌面端第三列和移动端最后一步。

## 注意事项

- 所有卡片组件都应该接受 `CardBodyProps` 类型的 props
- 卡片 `id` 必须唯一，建议使用小写无空格
- 移动端会按 `cardConfigs` 数组顺序显示
- 桌面端初始布局在 `desktopInitialLayout` 中配置，但用户可以拖放重新排列
- 如果 `desktopInitialLayout` 中缺少某个卡片 id，该卡片不会在桌面端显示（但仍会出现在移动端）

