import {
  format,
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
} from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (date) => {
  if (!date) return ''
  const d = date?.toDate ? date.toDate() : date
  return format(d, 'dd/MM/yyyy', { locale: es })
}

export const formatDateTime = (date) => {
  if (!date) return ''
  const d = date?.toDate ? date.toDate() : date
  return format(d, 'dd/MM/yyyy HH:mm', { locale: es })
}

export const getRelativeTime = (date) => {
  if (!date) return ''
  const d = date?.toDate ? date.toDate() : date
  return formatDistanceToNow(d, { addSuffix: true, locale: es })
}

export const isOverdue = (dueDate, completed) => {
  if (!dueDate || completed) return false
  const d = dueDate?.toDate ? dueDate.toDate() : dueDate
  return isPast(d) && !isToday(d)
}

export const getDueDateLabel = (dueDate) => {
  if (!dueDate) return null
  const d = dueDate?.toDate ? dueDate.toDate() : dueDate
  if (isToday(d)) return 'Hoy'
  if (isTomorrow(d)) return 'Mañana'
  if (isPast(d)) return 'Vencida'
  return formatDate(d)
}
