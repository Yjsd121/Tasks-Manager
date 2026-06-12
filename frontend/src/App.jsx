import './App.css'
import { UserProvider } from './context/usercontext'
import { AppRouter } from './Router/Router'

export function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}
