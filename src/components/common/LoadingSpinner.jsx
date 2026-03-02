export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Cargando"
      />
    </div>
  )
}
