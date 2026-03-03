import { Link } from 'react-router-dom'
import { updateTask, deleteTask } from '../../services/taskService'
import { CATEGORIES } from '../../utils/constants'
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers'

const CATEGORY_CLASSES = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
  gray: 'bg-gray-100 text-gray-800',
}

export default function TaskCard({ task }) {
  const category = CATEGORIES.find((c) => c.id === task.category)
  const categoryClass = category
    ? CATEGORY_CLASSES[category.color] || 'bg-gray-100 text-gray-800'
    : 'bg-gray-100 text-gray-800'
  const overdue = isOverdue(task.dueDate, task.completed)

  const handleToggleComplete = async (e) => {
    e.preventDefault()
    await updateTask(task.id, { completed: !task.completed })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (window.confirm('¿Eliminar esta tarea?')) {
      await deleteTask(task.id)
    }
  }

  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block"
    >
      <div
        className={`card hover:shadow-lg transition-shadow p-4 ${
          task.completed ? 'opacity-60' : ''
        } ${overdue ? 'border-2 border-red-500' : ''}`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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
                <span className="text-sm text-gray-500">
                  {getDueDateLabel(task.dueDate)}
                </span>
              )}
              <span
                className={`text-xs ${
                  task.completed ? 'text-green-600' : 'text-amber-600'
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
