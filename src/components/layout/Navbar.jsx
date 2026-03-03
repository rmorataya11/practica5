import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { logoutUser } from '../../services/authService'

export default function Navbar() {
  const { user, clearUser } = useAuthStore()
  const { theme, toggleTheme } = useUIStore()
  const navigate = useNavigate()
  const isDark = theme === 'dark'

  const handleLogout = async () => {
    const result = await logoutUser()
    if (result.success) {
      clearUser()
      navigate('/login')
    }
  }

  return (
    <nav
      className={
        isDark
          ? 'bg-gray-800 shadow-md border-b border-gray-700'
          : 'bg-white shadow-md'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            >
              Task Manager Pro
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-secondary"
              title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {isDark ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {user?.displayName || user?.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-secondary"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
