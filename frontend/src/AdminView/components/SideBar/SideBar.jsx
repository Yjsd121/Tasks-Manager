import { NavLink, useNavigate } from 'react-router-dom'
import './SideBar.css'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { Logout } from '@/utils/Logout'
export function SideBar() {
  const navigate = useNavigate()
  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <img className='icon' src='/TasksIcon.png' alt='Logo' />
        <h3>Task Manager</h3>
      </div>

      <nav className='sidebar-nav'>
        <NavLink to='/AdminView/Dashboard'><h3>Statistics</h3></NavLink>
        <NavLink to='/AdminView/User'><h3>User</h3></NavLink>
      </nav>

      <div className='sidebar-footer'>
        <button onClick={() => { Logout(navigate) }} className='btn-logout'><LoginOutlinedIcon />Logout</button>
      </div>
    </aside>
  )
}
