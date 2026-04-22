function TaskControls(props) {
  const filters = [
    { label: 'Все', value: 'all' },
    { label: 'Активные', value: 'active' },
    { label: 'Готовые', value: 'done' }
  ]

  return (
    <div className="mx-auto mb-4 flex w-full max-w-5xl flex-col gap-3 rounded-lg border border-white/20 bg-white/5 p-4 text-left md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-emerald-200" htmlFor="taskSearch">
          Поиск
        </label>
        <input
          className="w-full min-w-64 rounded-md border border-emerald-400 bg-white px-3 py-2 text-black outline-none focus:ring-2 focus:ring-emerald-300"
          id="taskSearch"
          onChange={(event) => props.setSearchQuery(event.target.value)}
          placeholder="Название задачи"
          type="search"
          value={props.searchQuery}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            className={
              props.statusFilter === filter.value
                ? 'rounded-md bg-emerald-500 px-3 py-2 text-sm font-bold text-white'
                : 'rounded-md border border-white/30 px-3 py-2 text-sm font-bold text-white hover:bg-white/10'
            }
            key={filter.value}
            onClick={() => props.setStatusFilter(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TaskControls
