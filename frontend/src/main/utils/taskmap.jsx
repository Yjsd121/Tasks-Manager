import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { getcolor } from '@/static/getcolor'
import Checkbox from '@mui/material/Checkbox'

export function Tasksmap({ tasks }) {
  return (
    <section className='Tasks-container'>
      {
        tasks.map(item => {
          const bg = getcolor(item.priority)
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
                <div>
                  <h3>Title: {item.title}</h3>  <h3> Priority: {item.priority}</h3>
                </div>

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
                  <Checkbox onClick={() => { console.log('hola') }} />
                  <p>Marck</p>
                </div>
                <button className='btn-card'><DeleteForeverOutlinedIcon /></button>
              </div>
            </section>
          )
        })
      }
    </section>
  )
}
