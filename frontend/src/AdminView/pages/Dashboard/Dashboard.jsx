import './Dashboard.css'

import { SideBar } from '../../components/SideBar/SideBar.jsx'
import MyChart from '../../components/barchar.jsx'
import { Minichart } from '../../../components/minichart/minichart.jsx'

import { taskStatusData } from '../../../mock/Taskschart.js'
import { employeeCompletedTasks } from '../../../mock/userscompleted.js'
import { usersMiniCards } from '../../../mock/userdata2.js'

export function Dashboard() {
  return (
    <section className='Dashboard-layout'>
      <SideBar />
      <main className='dashboard-content'>
        <section className='dashboard-header'>
          <div className='dashboard-title'>
            <h2>Statistics</h2>
            <p>Dashboard overview</p>
          </div>
        </section>

        <section className='dashboard-stats'>
          <Minichart />
        </section>

        <section className='charts-grid'>
          <div className='chart-card'>
            <h3>Total Tasks</h3>
            <MyChart data={taskStatusData} />
          </div>

          <div className='chart-card'>
            <h3>Tasks completed by user</h3>
            <MyChart data={employeeCompletedTasks} />
          </div>
        </section>

        <section className='minicards'>
          {
            usersMiniCards.map(user => {
              const progress =
                user.asignadas === 0
                  ? 0
                  : Math.round(
                    (user.completed / user.asignadas) * 100
                  )
              return (
                <div key={user.id} className='minicard'>
                  <img className='icon' src='/TasksIcon.png' />
                  <div style={{ width: '100%' }}>
                    <div className='tiitle-tasks'>
                      <p>{user.nombre}</p>
                      {progress}%
                    </div>
                    <div className='progress-container'>
                      <div className='progress-bar' style={{ width: `${progress}%` }} />
                    </div>
                    <div className='tasks-cont'>
                      <p>{user.asignadas} asignadas </p>
                      <p style={{ color: 'green' }}> {user.completed} ✅ </p>
                      <p style={{ color: 'orange' }}> {user.pending} ⌛ </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
      </main>
    </section>
  )
}
