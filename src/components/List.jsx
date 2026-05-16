import ListItem from './ListItem'

function List(props) {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-auto rounded-lg border border-slate-300 bg-white dark:border-white/20 dark:bg-white/5">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead className="bg-slate-100 text-sm uppercase tracking-wide text-emerald-700 dark:bg-white/10 dark:text-emerald-200">
          <tr>
            <th className="w-16 px-4 py-3">#</th>
            <th className="w-28 px-4 py-3">Статус</th>
            <th className="px-4 py-3">Задача</th>
            <th className="w-56 px-4 py-3 text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          {props.items.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-center text-slate-500 dark:text-white/60" colSpan="4">
                Список задач пуст
              </td>
            </tr>
          ) : (
            props.items.map((item, index) => (
              <ListItem
                cancelEditTask={props.cancelEditTask}
                deleteTask={props.deleteTask}
                item={item}
                index={index}
                key={item.id}
                saveTaskName={props.saveTaskName}
                startEditTask={props.startEditTask}
                toggleTaskIsDone={props.toggleTaskIsDone}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default List
