import Form from '../components/Form'
import List from '../components/List'
import TaskControls from '../components/TaskControls'

function TasksPage(props) {
  return (
    <div>
      <div className="mx-auto mb-4 grid w-full max-w-5xl gap-3 text-left md:grid-cols-2">
        <div className="rounded-lg border border-slate-300 bg-white p-4 dark:border-white/20 dark:bg-white/5">
          <p className="text-sm text-slate-500 dark:text-white/60">Всего задач</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{props.tasksCount}</p>
        </div>
        <div className="rounded-lg border border-slate-300 bg-white p-4 dark:border-white/20 dark:bg-white/5">
          <p className="text-sm text-slate-500 dark:text-white/60">Выполнено</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{props.doneCount}</p>
        </div>
      </div>

      <Form createTask={props.createTask} />
      <TaskControls
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        setStatusFilter={props.setStatusFilter}
        statusFilter={props.statusFilter}
      />
      <List
        cancelEditTask={props.cancelEditTask}
        deleteTask={props.deleteTask}
        items={props.items}
        saveTaskName={props.saveTaskName}
        startEditTask={props.startEditTask}
        toggleTaskIsDone={props.toggleTaskIsDone}
      />
    </div>
  )
}

export default TasksPage
