import { useEffect, useState } from 'react'
import './App.css'
import List from './components/List'
import Form from './components/Form'
import TaskControls from './components/TaskControls'

const TASKS_STORAGE_KEY = 'minireact_tasks'

const defaultTasks = [{
  id: 0,
  name: 'Сварить рис',
  editing: false,
  done: false
}]

const normalizeTask = (task, index) => ({
  id: Number.isInteger(task.id) ? task.id : index,
  name: String(task.name ?? ''),
  editing: false,
  done: Boolean(task.done)
})

const getNextTaskId = (tasks) => {
  if (tasks.length === 0) {
    return 0
  }

  return Math.max(...tasks.map(task => task.id)) + 1
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)

    if (!savedTasks) {
      return defaultTasks
    }

    try {
      const parsedTasks = JSON.parse(savedTasks)

      if (!Array.isArray(parsedTasks)) {
        return defaultTasks
      }

      return parsedTasks.map(normalizeTask)
    } catch {
      return defaultTasks
    }
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const tasksToSave = tasks.map(({ id, name, done }) => ({ id, name, done }))
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToSave))
  }, [tasks])

  const createTask = (name) => {
    const task = {
      id: getNextTaskId(tasks),
      name,
      editing: false,
      done: false
    }

    setTasks([...tasks, task])
  }

  const toggleTaskIsDone = (id, value) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: value }
        : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, editing: true }
        : task
    ))
  }

  const cancelEditTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, editing: false }
        : task
    ))
  }

  const saveTaskName = (id, name) => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, name: trimmedName, editing: false }
        : task
    ))
  }

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !task.done) ||
      (statusFilter === 'done' && task.done)

    return matchesSearch && matchesStatus
  })

  return (
    <>
      <h1>To-Do List</h1>
      <div className="w-full px-4 pb-8">
        <Form createTask={createTask} />
        <TaskControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
        />
        <List
          cancelEditTask={cancelEditTask}
          deleteTask={deleteTask}
          items={visibleTasks}
          saveTaskName={saveTaskName}
          startEditTask={startEditTask}
          toggleTaskIsDone={toggleTaskIsDone}
        />
      </div>
    </>
  )
}

export default App
