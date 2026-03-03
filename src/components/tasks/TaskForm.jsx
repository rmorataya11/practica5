import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { createTask, updateTask } from '../../services/taskService'
import { CATEGORIES, PRIORITIES } from '../../utils/constants'

export default function TaskForm({ onClose, taskToEdit = null }) {
  const user = useAuthStore((state) => state.user)
  const theme = useUIStore((state) => state.theme)
  const isDark = theme === 'dark'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEditing = !!taskToEdit

  const defaultValues = taskToEdit
    ? {
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        category: taskToEdit.category,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate
          ? (taskToEdit.dueDate.toISOString
              ? taskToEdit.dueDate.toISOString()
              : new Date(taskToEdit.dueDate).toISOString()
            ).split('T')[0]
          : '',
      }
    : {
        title: '',
        description: '',
        category: 'other',
        priority: 'medium',
        dueDate: '',
      }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    const taskData = {
      title: data.title,
      description: data.description || '',
      category: data.category,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    }
    let result
    if (isEditing) {
      result = await updateTask(taskToEdit.id, taskData)
    } else {
      result = await createTask(taskData, user.uid)
    }
    setLoading(false)
    if (result.success) {
      toast.success(isEditing ? 'Tarea actualizada' : 'Tarea creada')
      onClose()
    } else {
      const msg = isEditing ? 'Error al actualizar la tarea' : 'Error al crear la tarea'
      setError(msg)
      toast.error(msg)
    }
  }

  const formCardClass = isDark
    ? 'bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6'
    : 'card p-6'
  const labelClass = isDark ? 'block text-sm font-medium text-gray-300 mb-2' : 'block text-sm font-medium text-gray-700 mb-2'
  const inputClass = isDark
    ? 'w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
    : 'input-field'

  return (
    <div className={formCardClass}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className={isDark ? 'text-gray-400 hover:text-gray-200 text-2xl leading-none' : 'text-gray-500 hover:text-gray-700 text-2xl leading-none'}
          aria-label="Cerrar"
        >
          &times;
        </button>
      </div>

      {error && (
        <div className={isDark ? 'bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4' : 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4'}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className={labelClass}>
            Título *
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder="Ej: Completar informe mensual"
            {...register('title', {
              required: 'El título es obligatorio',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Descripción
          </label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder="Descripción detallada de la tarea..."
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Categoría *
            </label>
            <select
              className={inputClass}
              {...register('category', { required: true })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Prioridad *
            </label>
            <select
              className={inputClass}
              {...register('priority', { required: true })}
            >
              {PRIORITIES.map((prio) => (
                <option key={prio.id} value={prio.id}>
                  {prio.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Fecha de vencimiento
            </label>
            <input
              type="date"
              className={inputClass}
              {...register('dueDate')}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading
              ? isEditing
                ? 'Guardando...'
                : 'Creando...'
              : isEditing
                ? 'Guardar cambios'
                : 'Crear tarea'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors' : 'btn-secondary'}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
