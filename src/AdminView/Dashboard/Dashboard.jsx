import './Dashboard.css'
import { SideBar } from '../../components/SideBar/SideBar'
import MyChart from '../../components/barchar'

export function Dashboard() {
  return (
    <section>
      <section className='AdminView-container'>
        <SideBar />
        <section className='container'>
          <section className='Title-container'>
            <div className='title'>
              <h2>Statistics</h2>
              <p>Dashboard</p>
            </div>
          </section>
          <div className='Dashboard-contaier'>
            <div>
              <MyChart />
            </div>
            <div>
              <MyChart />
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
