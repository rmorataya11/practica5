import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { logoutUser } from '../../services/authService'

export default function Navbar() {
  const user = useAuthStore((state) => state.user)

  const handleLogout = async () => {
    await logoutUser()
    useAuthStore.getState().clearUser()
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-gray-800">
          Task Manager Pro
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{user.displayName || user.email}</span>
            <button type="button" onClick={handleLogout} className="btn-secondary">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
