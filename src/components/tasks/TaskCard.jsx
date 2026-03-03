import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useUIStore } from '../../store/uiStore'
import { updateTask, deleteTask } from '../../services/taskService'
import { CATEGORIES } from '../../utils/constants'
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers'

const CATEGORY_CLASSES = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
  gray: 'bg-gray-100 text-gray-800',
}

const CATEGORY_CLASSES_DARK = {
  blue: 'bg-blue-900/50 text-blue-300',
  green: 'bg-green-900/50 text-green-300',
  purple: 'bg-purple-900/50 text-purple-300',
  gray: 'bg-gray-700 text-gray-300',
}

export default function TaskCard({ task }) {
  const theme = useUIStore((state) => state.theme)
  const isDark = theme === 'dark'
  const category = CATEGORIES.find((c) => c.id === task.category)
  const categoryClasses = isDark ? CATEGORY_CLASSES_DARK : CATEGORY_CLASSES
  const categoryClass = category
    ? categoryClasses[category.color] || (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
    : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
  const overdue = isOverdue(task.dueDate, task.completed)
  const cardBaseClass = isDark
    ? 'bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4'
    : 'card hover:shadow-lg transition-shadow p-4'

  const handleToggleComplete = async (e) => {
    e.preventDefault()
    const result = await updateTask(task.id, { completed: !task.completed })
    if (result.success) {
      toast.success(task.completed ? 'Tarea marcada como pendiente' : 'Tarea completada')
    } else {
      toast.error('Error al actualizar la tarea')
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm('¿Eliminar esta tarea?')) {
      const result = await deleteTask(task.id)
      if (result.success) {
        toast.success('Tarea eliminada')
      } else {
        toast.error('Error al eliminar la tarea')
      }
    }
  }

  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block"
    >
      <div
        className={`${cardBaseClass} ${
          task.completed ? 'opacity-60' : ''
        } ${overdue ? 'border-2 border-red-500' : ''}`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold ${
                task.completed
                  ? 'line-through text-gray-500'
                  : isDark
                    ? 'text-gray-100'
                    : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {category && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${categoryClass}`}
                >
                  {category.label}
                </span>
              )}
              {getDueDateLabel(task.dueDate) && (
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {getDueDateLabel(task.dueDate)}
                </span>
              )}
              <span
                className={`text-xs ${
                  task.completed ? 'text-green-500' : 'text-amber-500'
                }`}
              >
                {task.completed ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0" onClick={(e) => e.preventDefault()}>
            <button
              type="button"
              onClick={handleToggleComplete}
              className={task.completed ? 'btn-secondary text-sm' : 'btn-primary text-sm'}
            >
              {task.completed ? 'Pendiente' : 'Completar'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn-danger text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
