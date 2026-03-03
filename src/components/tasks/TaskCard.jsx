import { Link } from 'react-router-dom'

export default function TaskCard({ task }) {
  return (
    <div className="card p-4 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <Link
          to={`/tasks/${task.id}`}
          className={`block font-medium hover:text-blue-600 ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {task.title}
        </Link>
        {task.category && (
          <span className="text-sm text-gray-500">{task.category}</span>
        )}
      </div>
    </div>
  )
}
