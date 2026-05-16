import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import TasksPage from './pages/TasksPage'
import ApiPage from './pages/ApiPage'

const TASKS_STORAGE_KEY = 'minireact_tasks'
const THEME_STORAGE_KEY = 'minireact_theme'

const defaultTasks = [{
  id: 0,
  name: 'Сварить рис',
  editing: false,
  done: false
}]

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)

    return savedTasks ? JSON.parse(savedTasks) : defaultTasks
  })
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const createTask = (name) => {
    const task = {
      id: Date.now(),
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

  const doneCount = tasks.filter(task => task.done).length

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const linkClass = ({ isActive }) => {
    if (isActive) {
      return 'rounded-md bg-emerald-500 px-4 py-2 font-bold text-white'
    }

    return 'rounded-md border border-slate-400 px-4 py-2 font-bold text-slate-900 hover:bg-slate-200 dark:border-white/30 dark:text-white dark:hover:bg-white/10'
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-gray-900 dark:text-white">
        <div className="mx-auto min-h-screen w-full max-w-6xl border-x border-slate-300 text-center dark:border-white/15">
          <header className="border-b border-slate-300 px-4 py-5 dark:border-white/15">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">To-Do List</h1>
            <nav className="mt-4 flex flex-wrap justify-center gap-3">
              <NavLink className={linkClass} to="/">
                Задачи
              </NavLink>
              <NavLink className={linkClass} to="/api">
                API
              </NavLink>
              <button
                className="rounded-md border border-slate-400 px-4 py-2 font-bold text-slate-900 hover:bg-slate-200 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                onClick={changeTheme}
                type="button"
              >
                {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
              </button>
            </nav>
          </header>

          <main className="w-full px-4 py-6">
            <Routes>
              <Route
                element={(
                  <TasksPage
                    cancelEditTask={cancelEditTask}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    doneCount={doneCount}
                    items={visibleTasks}
                    saveTaskName={saveTaskName}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setStatusFilter={setStatusFilter}
                    startEditTask={startEditTask}
                    statusFilter={statusFilter}
                    tasksCount={tasks.length}
                    toggleTaskIsDone={toggleTaskIsDone}
                  />
                )}
                path="/"
              />
              <Route element={<ApiPage tasksCount={tasks.length} />} path="/api" />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
