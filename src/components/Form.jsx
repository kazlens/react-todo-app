import { useState } from 'react'

function Form(props) {
  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const value = event.target.value

    setTaskName(value)

    if (error) {
      setError('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTaskName = taskName.trim()

    if (!trimmedTaskName) {
      setError('Введите название задачи')
      return
    }

    if (trimmedTaskName.length < 3) {
      setError('Название должно быть не короче 3 символов')
      return
    }

    if (trimmedTaskName.length > 80) {
      setError('Название должно быть не длиннее 80 символов')
      return
    }

    props.createTask(trimmedTaskName)
    setTaskName('')
    setError('')
  }

  return (
    <form
      className="mx-auto mb-4 flex w-full max-w-5xl flex-col gap-3 rounded-lg border border-slate-300 bg-white p-4 text-left shadow-sm dark:border-white/20 dark:bg-white/5 md:flex-row md:items-end"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-1 flex-col gap-2">
        <label className="text-sm font-bold text-emerald-600" htmlFor="taskName">
          Новая задача
        </label>
        <input
          aria-describedby={error ? 'taskNameError' : undefined}
          aria-invalid={Boolean(error)}
          className={
            error
              ? 'w-full rounded-md border border-red-400 bg-white px-3 py-2 text-black outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-red-300'
              : 'w-full rounded-md border border-emerald-400 bg-white px-3 py-2 text-black outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-300'
          }
          id="taskName"
          maxLength="80"
          name="taskName"
          onChange={handleChange}
          placeholder="Например: купить продукты"
          type="text"
          value={taskName}
        />
        {error && (
          <p className="text-sm font-medium text-red-400" id="taskNameError">
            {error}
          </p>
        )}
      </div>
      <button
        className="rounded-md bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white/70 md:w-auto"
        disabled={!taskName.trim()}
        type="submit"
      >
        Добавить задачу
      </button>
    </form>
  )
}

export default Form
