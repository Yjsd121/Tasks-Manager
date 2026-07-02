import './filterBar.css'

export function Searchfilters({ showmodal, setshow, filter, setFilter }) {
  const filters = [
    'all',
    'pending',
    'in-progress',
    'completed'
  ]

  return (
    <section className='Search-container'>
      <div className='filters-container'>
        {
          filters.map(item => (
            <button
              key={item}
              className={
                filter === item
                  ? 'filter active'
                  : 'filter'
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))
        }
      </div>
      <div className='search-container'>
        <button onClick={() => { setshow(!showmodal) }}>Add new task</button>
      </div>
    </section>
  )
}
