import { useState } from 'react'

function ListItem(props) {
  const [taskName, setTaskName] = useState(props.item.name)

  const checkboxToggle = (event) => {
    props.toggleTaskIsDone(props.item.id, event.target.checked)
  }

  const handleSave = () => {
    props.saveTaskName(props.item.id, taskName)
  }

  const handleCancel = () => {
    setTaskName(props.item.name)
    props.cancelEditTask(props.item.id)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSave()
  }

  return (
    <tr className="border-t border-slate-200 dark:border-white/10">
      <td className="px-4 py-3 text-slate-500 dark:text-white/70">{props.index + 1}</td>
      <td className="px-4 py-3">
        <input
          checked={props.item.done}
          className="h-5 w-5 cursor-pointer accent-emerald-500"
          onChange={checkboxToggle}
          type="checkbox"
        />
      </td>
      <td className="px-4 py-3">
        {props.item.editing ? (
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              autoFocus
              className="w-full rounded-md border border-emerald-400 bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-emerald-300"
              onChange={(event) => setTaskName(event.target.value)}
              type="text"
              value={taskName}
            />
          </form>
        ) : (
          <span className={props.item.done ? 'text-slate-400 line-through dark:text-white/50' : 'text-slate-900 dark:text-white'}>
            {props.item.name}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          {props.item.editing ? (
            <>
              <button
                className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-600"
                onClick={handleSave}
                type="button"
              >
                Сохранить
              </button>
              <button
                className="rounded-md border border-slate-400 px-3 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
                onClick={handleCancel}
                type="button"
              >
                Отмена
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-md border border-emerald-400 px-3 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-500/10"
                onClick={() => props.startEditTask(props.item.id)}
                type="button"
              >
                Изменить
              </button>
              <button
                className="rounded-md border border-red-400 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-500/10"
                onClick={() => props.deleteTask(props.item.id)}
                type="button"
              >
                Удалить
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

export default ListItem
