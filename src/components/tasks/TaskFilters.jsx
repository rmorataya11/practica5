import { useTaskStore } from '../../store/taskStore'
import { useUIStore } from '../../store/uiStore'
import { FILTERS, CATEGORIES } from '../../utils/constants'

export default function TaskFilters() {
  const { currentFilter, currentCategory, searchQuery, setFilter, setCategory, setSearchQuery } = useTaskStore()
  const theme = useUIStore((state) => state.theme)
  const isDark = theme === 'dark'

  const cardClass = isDark
    ? 'bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 mb-6'
    : 'card mb-6'
  const labelClass = isDark ? 'block text-sm font-medium text-gray-300 mb-2' : 'block text-sm font-medium text-gray-700 mb-2'
  const btnInactiveClass = isDark
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  const selectClass = isDark
    ? 'w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
    : 'input-field'
  const inputClass = isDark
    ? 'w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
    : 'input-field'

  return (
    <div className={cardClass}>
      <div className="mb-4">
        <label className={labelClass}>Buscar tareas</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Título o descripción..."
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Filtrar por estado
          </label>
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : btnInactiveClass
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>
            Filtrar por categoría
          </label>
          <select
            value={currentCategory}
            onChange={(e) => setCategory(e.target.value)}
            className={selectClass}
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
