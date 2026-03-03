import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { createTask } from '../../services/taskService'
import { CATEGORIES, PRIORITIES } from '../../utils/constants'

export default function TaskForm({ onClose }) {
  const user = useAuthStore((state) => state.user)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('other')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }
    setLoading(true)
    const result = await createTask(
      { title: title.trim(), category, priority },
      user.uid
    )
    setLoading(false)
    if (result.success) {
      setTitle('')
      onClose()
    } else {
      setError(result.error || 'Error al crear la tarea')
    }
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Nueva tarea</h3>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="¿Qué hay que hacer?"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-field"
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creando...' : 'Crear tarea'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
