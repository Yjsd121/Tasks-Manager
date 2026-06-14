import { NavLink } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import './barnav.css'
import { UserDcontext } from '@/context/usercontext'
import { useEffect } from 'react'

export function Barnav() {
  const { UserData, setUserData } = UserDcontext()

  useEffect(() => {
    function loaddata() {
      const user = JSON.parse(window.localStorage.getItem('user'))
      console.log(user)
      setUserData({
        ...UserData,
        email: user.email,
        role: user.role,
        name: user.name,
        Img: user.Img
      })
    }
    loaddata()
  }, [])

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
            <img
              style={{
                width: '35px'
              }}
              src={`http://localhost:3000/uploads/${UserData.Img}`}
              alt='xd'
            />
            <p>{UserData.name}</p>
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
