import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const TASKS_COLLECTION = 'tasks'

export function subscribeToTasks(userId, callback) {
  const q = query(
    collection(db, TASKS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.() ?? null,
      dueDate: docSnap.data().dueDate?.toDate?.() ?? null,
    }))
    callback(tasks)
  })
  return unsubscribe
}

export async function createTask(taskData, userId) {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...taskData,
      userId,
      completed: false,
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error creating task:', error)
    return { success: false, error: error.message }
  }
}

export async function updateTask(taskId, updates) {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await updateDoc(taskRef, updates)
    return { success: true }
  } catch (error) {
    console.error('Error updating task:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteTask(taskId) {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId))
    return { success: true }
  } catch (error) {
    console.error('Error deleting task:', error)
    return { success: false, error: error.message }
  }
}

export async function getTaskById(taskId) {
  try {
    const taskDoc = await getDoc(doc(db, TASKS_COLLECTION, taskId))
    if (taskDoc.exists()) {
      const data = taskDoc.data()
      return {
        success: true,
        task: {
          id: taskDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() ?? null,
          dueDate: data.dueDate?.toDate?.() ?? null,
        },
      }
    }
    return { success: false, error: 'Tarea no encontrada' }
  } catch (error) {
    console.error('Error getting task:', error)
    return { success: false, error: error.message }
  }
}
