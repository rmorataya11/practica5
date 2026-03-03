import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useUIStore } from '../../store/uiStore'

export default function Layout() {
  const theme = useUIStore((state) => state.theme)
  const isDark = theme === 'dark'

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
