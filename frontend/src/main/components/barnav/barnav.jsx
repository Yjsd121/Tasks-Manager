import { NavLink } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import './barnav.css'

export function Barnav() {
  return (
    <>
      <section className='barnav'>
        <div className='logo'>
          <NavLink className='link'>
            <img className='icon' src='TasksIcon.png' />
            <p>Tasks Manager</p>
          </NavLink>
        </div>
        <div className='links'>
          <NavLink className='link'>
            <AssignmentOutlinedIcon />
            <p>Tasks</p>
          </NavLink>
          <NavLink className='link'>
            <AccountCircleOutlinedIcon />
            <p>Profile</p>
          </NavLink>
          <NavLink to='/' onClick={() => { window.localStorage.clear() }} className='link'>
            <LogoutOutlinedIcon />
            <p>Logout</p>
          </NavLink>
        </div>
      </section>
    </>
  )
}
