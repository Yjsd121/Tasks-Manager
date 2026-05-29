import './filterBar.css'
import { useState } from 'react'
export function Searchfilters() {
  const [filter, setFilter] = useState('all')
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
        <button>Nueva Tarea</button>
      </div>
    </section>
  )
}
