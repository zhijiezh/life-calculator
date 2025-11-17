import { useState, useMemo } from 'react'
import { Box, Typography, Card, CardHeader, CardContent, Divider } from '@mui/material'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CalculatorData } from '../types'
import DesktopCard from './cardWrappers/DesktopCard'
import BasicInfoBody from '../cardBodies/BasicInfoBody'
import SalaryBody from '../cardBodies/SalaryBody'
import SpendingBody from '../cardBodies/SpendingBody'
import InvestmentBody from '../cardBodies/InvestmentBody'
import TargetsBody from '../cardBodies/TargetsBody'
import ResultsBody from '../cardBodies/ResultsBody'

interface DesktopExperienceProps {
  data: CalculatorData
  setData: (data: CalculatorData) => void
}

interface CardConfig {
  id: string
  title: string
  description: string
  component: JSX.Element
}

// 空列投放区域组件
function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {children}
    </Box>
  )
}

export default function DesktopExperience({ data, setData }: DesktopExperienceProps) {
  // 初始卡片配置（用 useMemo 避免每次渲染重新创建）
  const initialCards: CardConfig[] = useMemo(
    () => [
      { id: 'basic', title: '基础信息', description: '设置预测范围与初始资产', component: <BasicInfoBody data={data} setData={setData} /> },
      { id: 'salary', title: '工资收入曲线', description: '拖拽节点或输入数值，描绘未来收入变化', component: <SalaryBody data={data} setData={setData} /> },
      { id: 'spending', title: '支出设置', description: '每年的基础支出和通胀假设', component: <SpendingBody data={data} setData={setData} /> },
      { id: 'investment', title: '投资设置', description: '设定预期的年投资回报率', component: <InvestmentBody data={data} setData={setData} /> },
      { id: 'targets', title: '目标设置', description: '定义收入、储蓄与投资占比目标', component: <TargetsBody data={data} setData={setData} /> },
      { id: 'results', title: '结果预览', description: '实时查看预测与图表', component: <ResultsBody data={data} /> },
    ],
    [data, setData]
  )

  // 列布局状态：每列包含哪些卡片 ID
  const [columnLayout, setColumnLayout] = useState<string[][]>([
    ['basic', 'spending', 'targets'],
    ['salary', 'investment'],
    ['results'],
  ])

  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 拖动 8px 后才激活，避免误触
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    // 找到 active 所在的列
    let activeColumnIndex = -1
    let activeCardIndex = -1

    columnLayout.forEach((column, colIdx) => {
      const activeIdx = column.indexOf(active.id as string)
      if (activeIdx !== -1) {
        activeColumnIndex = colIdx
        activeCardIndex = activeIdx
      }
    })

    if (activeColumnIndex === -1) return

    // 检查 over 是否是列的 droppable ID（格式：column-0, column-1, column-2）
    const overIdStr = over.id.toString()
    if (overIdStr.startsWith('column-')) {
      const overColumnIndex = parseInt(overIdStr.replace('column-', ''), 10)

      // 如果目标列为空，或者拖到了不同的列
      if (columnLayout[overColumnIndex].length === 0 || overColumnIndex !== activeColumnIndex) {
        const newLayout = columnLayout.map((col) => [...col])
        const [movedCard] = newLayout[activeColumnIndex].splice(activeCardIndex, 1)
        newLayout[overColumnIndex].push(movedCard)
        setColumnLayout(newLayout)
      }
      return
    }

    // 找到 over 所在的列
    let overColumnIndex = -1
    let overCardIndex = -1

    columnLayout.forEach((column, colIdx) => {
      const overIdx = column.indexOf(over.id as string)
      if (overIdx !== -1) {
        overColumnIndex = colIdx
        overCardIndex = overIdx
      }
    })

    if (overColumnIndex === -1) return
    if (activeColumnIndex === overColumnIndex && activeCardIndex === overCardIndex) return

    const newLayout = [...columnLayout]

    if (activeColumnIndex === overColumnIndex) {
      // 同列内排序
      newLayout[activeColumnIndex] = arrayMove(newLayout[activeColumnIndex], activeCardIndex, overCardIndex)
    } else {
      // 跨列移动
      const [movedCard] = newLayout[activeColumnIndex].splice(activeCardIndex, 1)
      newLayout[overColumnIndex].splice(overCardIndex, 0, movedCard)
    }

    setColumnLayout(newLayout)
  }

  const handleDragEnd = () => {
    setActiveId(null)
  }

  const cardMap = useMemo(
    () =>
      initialCards.reduce((acc, card) => {
        acc[card.id] = card
        return acc
      }, {} as Record<string, CardConfig>),
    [initialCards]
  )

  return (
    <Box sx={{ p: 4, maxWidth: 1600, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          人生计算器（桌面体验）
        </Typography>
        <Typography variant="body1" color="text.secondary">
          拖拽卡片重新排列，所有输入卡片集中呈现，随时调整并实时查看结果。
        </Typography>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
          {columnLayout.map((column, colIdx) => {
            const isEmpty = column.length === 0
            return (
              <DroppableColumn key={colIdx} id={`column-${colIdx}`}>
                {isEmpty ? (
                  <Card
                    variant="outlined"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '150px',
                      backgroundColor: 'action.hover',
                      border: '2px dashed',
                      borderColor: 'divider',
                      opacity: 0.6,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      拖拽卡片到这里
                    </Typography>
                  </Card>
                ) : (
                  <SortableContext items={column} strategy={verticalListSortingStrategy}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                      }}
                    >
                      {column.map((cardId) => {
                        const card = cardMap[cardId]
                        return (
                          <DesktopCard key={cardId} id={cardId} title={card.title} description={card.description}>
                            {card.component}
                          </DesktopCard>
                        )
                      })}
                    </Box>
                  </SortableContext>
                )}
              </DroppableColumn>
            )
          })}
        </Box>
        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <Card
              variant="outlined"
              sx={{
                opacity: 0.95,
                transform: 'rotate(3deg)',
                boxShadow: 8,
                cursor: 'grabbing',
                width: '400px',
                maxWidth: '90vw',
                maxHeight: '80vh',
                overflow: 'hidden',
              }}
            >
              <CardHeader
                title={cardMap[activeId].title}
                subheader={cardMap[activeId].description}
                sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
              />
              <Divider />
              <CardContent 
                sx={{ 
                  overflow: 'auto',
                  maxHeight: 'calc(80vh - 100px)',
                }}
              >
                <Box
                  sx={{
                    filter: 'blur(1px)',
                    pointerEvents: 'none',
                    opacity: 0.7,
                  }}
                >
                  {cardMap[activeId].component}
                </Box>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  )
}

