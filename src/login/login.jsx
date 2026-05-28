import './login.css'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
export function Login() {
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
      <form className='login-container'>
        <div className='login'>
          <label>User</label>
          <div className='input-style'>
            <MailOutlineOutlinedIcon className='icon' />
            <input placeholder='email' />
          </div>
          <label>Password</label>
          <div className='input-style'>
            <VpnKeyOutlinedIcon className='icon' />
            <input placeholder='password' />
          </div>
        </div>
        <button>Login</button>
      </form>

    </main>
  )
}
