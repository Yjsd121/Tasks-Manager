import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Formlogin() {
  const navigate = useNavigate()
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

    const response = await fetch('http://localhost:3000/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    })

    const token = await response.json()
    console.log(token)

    window.localStorage.setItem('token', token.token)

    if (token.token) {
      navigate('/tasksview')
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
