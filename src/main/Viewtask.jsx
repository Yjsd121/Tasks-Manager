import './Viewtask.css'
import { Barnav } from '../components/barnav/barnav'
import { tasks } from '../static/Tasks'

export function Viewtask() {
  const getcolor = (valor) => {
    if (valor === 'pending') {
      return {
        bgTitle: '#f34a4a',
        bgcard: '#ffeaea',
        shadow: 'rgba(243, 74, 74, 0.5)'
      }
    } else if (valor === 'in-progress') {
      return {
        bgTitle: '#eebe22fa',
        bgcard: '#fcf6e2fa',
        shadow: 'rgba(238, 190, 34, 0.5)'
      }
    } else {
      return {
        bgTitle: '#48c528fa',
        bgcard: '#e8ffe2fa',
        shadow: 'rgba(71, 219, 34, 0.5)'
      }
    }
  }

  return (
    <main>
      <Barnav />
      <section className='Tasks-container'>
        {
          tasks.map(item => {
            const bg = getcolor(item.status)
            return (
              <section
                className='task-card'
                key={item.id}
                style={{
                  boxShadow: `2px 5px 0px 3px ${bg.shadow}`
                }}
              >
                <div
                  className='status'
                  style={{
                    background: bg.bgTitle
                  }}
                >
                  <h2>{item.status}</h2>
                </div>

                <div
                  className='tasks'
                  style={{
                    background: bg.bgcard
                  }}
                >
                  <h3>Title: {item.title}</h3>
                  <p>Description: </p>
                  <p>{item.description}</p>
                  <p className='date'>created at: {item.createdAt}</p>
                  <p className='date'>Due date: {item.dueDate}</p>
                </div>

                <div
                  className='btns'
                  style={{
                    background: bg.bgcard
                  }}
                >
                  <div className='check'>
                    <input type='radio' />
                    <p>Marcar</p>
                  </div>
                  <button>Borrar</button>
                </div>
              </section>
            )
          })
        }
      </section>

    </main>
  )
}
