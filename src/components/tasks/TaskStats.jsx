import { useTaskStore } from '../../store/taskStore'
import { useUIStore } from '../../store/uiStore'
import { isOverdue } from '../../utils/dateHelpers'

export default function TaskStats() {
  const tasks = useTaskStore((state) => state.tasks)
  const theme = useUIStore((state) => state.theme)
  const isDark = theme === 'dark'

  const total = tasks.length
  const pending = tasks.filter((t) => !t.completed).length
  const completed = tasks.filter((t) => t.completed).length
  const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length
  const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0

  const cardClass = isDark
    ? 'bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4'
    : 'bg-white rounded-lg shadow-md p-4'
  const labelClass = isDark ? 'text-sm font-medium text-gray-400' : 'text-sm font-medium text-gray-600'
  const valueClass = isDark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-800'

  const stats = [
    { label: 'Total', value: total, color: isDark ? 'text-blue-400' : 'text-blue-600' },
    { label: 'Pendientes', value: pending, color: isDark ? 'text-amber-400' : 'text-amber-600' },
    { label: 'Completadas', value: completed, color: isDark ? 'text-green-400' : 'text-green-600' },
    { label: 'Vencidas', value: overdue, color: isDark ? 'text-red-400' : 'text-red-600' },
    { label: 'Completitud', value: `${completionPercent}%`, color: isDark ? 'text-indigo-400' : 'text-indigo-600' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className={cardClass}>
          <p className={labelClass}>{stat.label}</p>
          <p className={`${valueClass} ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
