import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './login/login'
import { Viewtask } from './main/Viewtask'
import { AdminView } from './AdminView/AdminView'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/tasksView' element={<Viewtask />} />
        <Route path='/AdminView' element={<AdminView />} />
      </Routes>
    </BrowserRouter>
  )
}
