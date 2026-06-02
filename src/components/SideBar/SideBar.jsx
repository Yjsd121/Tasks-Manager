import { NavLink } from 'react-router-dom'
import './SideBar.css'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
export function SideBar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <img className='icon' src='TasksIcon.png' alt='Logo' />
        <h2>Task Manager</h2>
      </div>

      <nav className='sidebar-nav'>
        <NavLink to='/dashboard'><h3>Dashboard</h3></NavLink>
        <NavLink to='/tasks'><h3>User</h3></NavLink>
      </nav>

      <div className='sidebar-footer'>
        <button className='btn-logout'><LoginOutlinedIcon />Logout</button>
      </div>
    </aside>
  )
}
