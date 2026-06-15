import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/login/login'
import { Viewtask } from '@/main/Viewtask'
import { AdminView } from '@/AdminView/pages/UserView/AdminView'
import { Dashboard } from '@/AdminView/pages/Dashboard/Dashboard'
import { Mytasks } from '../AdminView/pages/Mytasks/Mytasks'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/tasksView' element={<Viewtask />} />
        <Route path='/AdminView'>
          <Route path='User' element={<AdminView />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='Mytasks' element={<Mytasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
