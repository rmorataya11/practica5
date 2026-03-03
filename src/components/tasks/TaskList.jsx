export default function TaskList({ tasks = [] }) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">No hay tareas para mostrar</p>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="card p-4 flex items-center justify-between"
        >
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.title}
          </span>
          {task.category && (
            <span className="text-sm text-gray-500">{task.category}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
