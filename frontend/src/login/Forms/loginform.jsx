import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authlogin } from '../service/Auth.service'
import { UserDcontext } from '../../context/usercontext'

export function Formlogin() {
  const navigate = useNavigate()
  const { UserData, setUserData } = UserDcontext()
  const [formData, setformData] = useState({
    email: '',
    password: ''
  })

  function handlechange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handlesubmit(e) {
    e.preventDefault()

    const response = await Authlogin(formData.email, formData.password)

    const token = await response.json()

    window.localStorage.setItem('token', token.token)
    window.localStorage.setItem('user', JSON.stringify({
      email: token.email,
      id: token.id,
      role: token.role,
      name: token.name
    }))

    setUserData({
      ...UserData,
      email: token.email,
      role: token.role,
      name: token.name
    })
    if (token.token && token.role === 'user') {
      navigate('/tasksview')
    } else if (token.token && token.role === 'admin') {
      navigate('/AdminView/Dashboard')
    }
  }
  return (
    <form
      className='login-container'
      onSubmit={handlesubmit}
    >
      <div className='login'>
        <label>User</label>
        <div className='input-style'>
          <MailOutlineOutlinedIcon className='icon' />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handlechange}
            className='login-input'
            placeholder='email'
          />
        </div>
        <label>Password</label>
        <div className='input-style'>
          <VpnKeyOutlinedIcon className='icon' />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handlechange}
            className='login-input'
            placeholder='password'
          />
        </div>
      </div>
      <button type='submit' className='primary-button'>Login</button>
    </form>
  )
}
