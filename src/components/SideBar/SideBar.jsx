import { NavLink } from 'react-router-dom'
import './SideBar.css'
export function SideBar() {
  return (
    <section className='SideBar-container'>
      <div className='SideBar'>
        <div className='Logo'>
          <p>Task Manager</p>
          <img className='icon' src='TasksIcon.png' />
          <div>
            <NavLink>
              hola
            </NavLink>
          </div>
        </div>

        <div className='logout'>
          logout
        </div>
      </div>
    </section>
  )
}
