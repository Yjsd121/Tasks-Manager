import './Viewtask.css'
import { Barnav } from '../components/barnav/barnav'
import { tasks } from '../static/Tasks'

export function Viewtask() {
  return (
    <main>
      <Barnav />
      <section className='Tasks-container'>
        {
          tasks.map(item => (
            <div className='tasks' key={item.id}>
              <div className='status'>
                <h2>{item.status}</h2>
              </div>
              <p>{item.title}</p>

              {item.createdBy}
            </div>
          ))
        }
      </section>
    </main>
  )
}
