import { useParams, Link } from 'react-router-dom'

export default function TaskDetails() {
  const { taskId } = useParams()

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link to="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver al Dashboard
      </Link>
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800">Detalle de tarea</h2>
        <p className="text-gray-600 mt-2">ID: {taskId}</p>
      </div>
    </div>
  )
}
