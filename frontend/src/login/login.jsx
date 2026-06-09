import './login.css'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import { useState } from 'react'

export function Login() {
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
  }
  return (
    <main className='principal'>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '20px'
      }}
      >
        <img className='icon' src='TasksIcon.png' />
      </div>

      <h2>Gestor de tareas</h2>
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

    </main>
  )
}
