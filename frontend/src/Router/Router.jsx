import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/login/login'
import { Viewtask } from '@/main/Viewtask'
import { AdminView } from '@/AdminView/pages/UserView/AdminView'
import { Dashboard } from '@/AdminView/pages/Dashboard/Dashboard'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/tasksView' element={<Viewtask />} />
        <Route path='/AdminView'>
          <Route path='User' element={<AdminView />} />
          <Route path='Dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
