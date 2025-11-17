# 人生计算器 - Life Calculator

一个帮助你预测未来财务状况的交互式 Web 应用。

## 功能特性

- 📱 **移动端优先设计** - 完美适配手机和平板
- 📊 **可视化工资曲线** - 通过交互式图表设置未来收入预期
- 💰 **投资对比分析** - 清晰展示投资对财富积累的巨大作用
- 🏠 **购买力计算** - 告诉你多少年后能买得起心仪的物品
- 🎯 **目标追踪** - 设置财务目标，查看达成时间

## 技术栈

- **React 18** + **TypeScript** - 现代化前端框架
- **Material-UI (MUI)** - Material Design 组件库
- **Recharts** - 数据可视化图表库
- **Vite** - 快速构建工具
- **GitHub Pages** - 免费静态托管

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署到 GitHub Pages

1. 确保 `vite.config.ts` 中的 `base` 路径与你的仓库名称匹配
2. 推送代码到 GitHub
3. GitHub Actions 会自动构建并部署到 `gh-pages` 分支

或者手动部署：

```bash
npm run deploy
```

## 项目结构

```
life-calculator/
├── src/
│   ├── pages/          # 分步骤页面
│   │   ├── Step1BasicInfo.tsx
│   │   ├── Step2Salary.tsx
│   │   ├── Step3Spending.tsx
│   │   ├── Step4Investment.tsx
│   │   ├── Step5Targets.tsx
│   │   └── Step6Results.tsx
│   ├── components/     # 可复用组件
│   │   ├── SalaryCurveEditor.tsx
│   │   ├── ResultsCharts.tsx
│   │   └── AffordabilityCard.tsx
│   ├── utils/          # 工具函数
│   │   └── calculator.ts
│   ├── types.ts        # TypeScript 类型定义
│   └── App.tsx
├── life_calculator.ipynb  # 原始 Jupyter Notebook（存档）
└── README.md
```

## 使用说明

1. **基础信息** - 设置预测年数、初始存款和货币单位
2. **工资收入** - 通过交互式图表设置未来每年的工资预期
3. **支出设置** - 输入当前年支出和通货膨胀率
4. **投资设置** - 设置预期的年投资回报率
5. **目标设置** - （可选）设置财务目标
6. **查看结果** - 查看详细的财务预测和图表

## 给ai

我希望把这个 ipynb 变成一个手机上也可以轻松访问的网站，目标是随时随地计算自己人生的收入，并且看成图表。但现在这个图表很粗糙，而且这些图都非常不容易看，
我希望要做到
- 能够手机轻松访问和操作各种逻辑，如果同时电脑也很方便展示最好啦，优先手机
- 需要一个很有创意的方式来让大家输入自己的工资收入期望曲线，像我现在这个人工手写函数肯定不行
- 需要一个更有趣的展示方式，比如可以让人选择一些重要的物品和他的现在的价格，告诉他多少年后他的存款能买的起，然后多少年能买 X 个？但我还没想好要怎么设置这个给用户
的选项
- 我感觉这个人生计算器在手机上应该是一个分阶段的多页面的应用？一页一页，然后最后一个滚动的结果？
- 我现在这里有很大一个作用是揭示投资的作用 - 如何能在小小的手机屏幕上更好的呈现这个对比？
- 我可能希望比较material design的风格？
- 保留我的ipynb文件作为存档




