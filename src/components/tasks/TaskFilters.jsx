import { useTaskStore } from '../../store/taskStore'
import { FILTERS, CATEGORIES } from '../../utils/constants'

export default function TaskFilters() {
  const { currentFilter, currentCategory, setFilter, setCategory } = useTaskStore()

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={currentFilter === f.id ? 'btn-primary' : 'btn-secondary'}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={currentCategory === c.id ? 'btn-primary' : 'btn-secondary'}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
