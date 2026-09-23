import { Formlogin } from './Forms/loginform.tsx'
import './login.css'

export function Login() {
  return (
    <main className='principal'>
      <div className='logo-container'>
        <img style={{ width: '60px' }} src='TasksIcon.png' />
      </div>

      <h2>Gestor de tareas</h2>
      <Formlogin />
    </main>
  )
}
