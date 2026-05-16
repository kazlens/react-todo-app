import { useEffect, useState } from 'react'

function ApiPage(props) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data)
      })
      .catch(() => {
        setError('Не получилось загрузить задачи с Placeholder API')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="mx-auto w-full max-w-5xl text-left">
      <div className="mb-4 rounded-lg border border-slate-300 bg-white p-4 dark:border-white/20 dark:bg-white/5">
        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Задачи из Placeholder API</h2>
        <p className="text-slate-600 dark:text-white/70">
          Данные загружаются через fetch с JSONPlaceholder. Сейчас в вашем списке задач: {props.tasksCount}
        </p>
      </div>

      {loading && (
        <p className="rounded-lg border border-slate-300 bg-white p-4 text-slate-900 dark:border-white/20 dark:bg-white/5 dark:text-white">
          Загрузка...
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-400 bg-red-500/10 p-4 text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-3 md:grid-cols-2">
          {todos.map((todo) => (
            <article
              className="rounded-lg border border-slate-300 bg-white p-4 dark:border-white/20 dark:bg-white/5"
              key={todo.id}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-emerald-600">ID: {todo.id}</span>
                <span className={todo.completed ? 'text-sm font-bold text-emerald-600' : 'text-sm font-bold text-slate-500 dark:text-white/70'}>
                  {todo.completed ? 'Готово' : 'В работе'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{todo.title}</h3>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ApiPage
