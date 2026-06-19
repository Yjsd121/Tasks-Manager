import { Formlogin } from './Forms/loginform'
import './login.css'

export function Login() {
  return (
    <main className='principal'>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '20px'
      }}
      >
        <img style={{ width: '60px' }} src='TasksIcon.png' />
      </div>

      <h2>Gestor de tareas</h2>
      <Formlogin />
    </main>
  )
}
