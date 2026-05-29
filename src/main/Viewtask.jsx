import './Viewtask.css'
import { Barnav } from '../components/barnav/barnav'
import { tasks } from '../mock/Tasks'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Searchfilters } from '../components/search-filters/filtersBar'
import { getcolor } from '../static/getcolor'
import { Minichart } from '../components/minichart/minichart'
import { Modal } from '../components/modal/modal'
import { useState } from 'react'
export function Viewtask() {
  const [showmodal, setshow] = useState(false)
  return (
    <main>
      <Barnav />
      <Minichart />
      <Searchfilters showmodal={showmodal} setshow={setshow} />
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
                  <button className='btn-card'><DeleteForeverOutlinedIcon /></button>
                </div>
              </section>
            )
          })
        }
      </section>
      {
        showmodal &&
          <Modal>
            <h1>hola</h1>
            <button onClick={() => { setshow(!showmodal) }}>cerrar</button>
          </Modal>
      }
    </main>
  )
}
