import { Tasksx } from '../../../components/Tasks/Tasksx'
import { SideBar } from '../../components/SideBar/SideBar'
import '../UserView/AdminView.css'

export function Mytasks() {
  return (
    <section className='AdminView-container'>
      <SideBar />
      <main className='admin-content'>
        <section className='dashboard-header'>
          <div className='dashboard-title'>
            <h2>My Tasks</h2>
            <p>Show your tasks and create tasks for everyone</p>
          </div>
        </section>
        <Tasksx />
      </main>
    </section>

  )
}
