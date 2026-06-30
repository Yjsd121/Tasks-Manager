import './Dashboard.css'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { SideBar } from '../../components/SideBar/SideBar.jsx'
import MyChart from '../../components/barchar.jsx'
import { MinicardMpa } from './utils/Minicards.jsx'

export function Dashboard() {
  const [data, setdata] = useState()
  const [usertask, setusertask] = useState()
  const [minicards, setmini] = useState()
  const [loading, setLoading] = useState(true)

  const hasuser = minicards?.length > 0

  const token = window.localStorage.getItem('token')

  async function Getdatatasks() {
    const response = await fetch('http://localhost:3000/Dashboard/Totaltask', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data.data
  }

  async function Getdatauser() {
    const response = await fetch('http://localhost:3000/Dashboard/Usertask', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data.data
  }

  async function Getminicards() {
    const response = await fetch('http://localhost:3000/Dashboard/Mini', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()
    return data.data
  }
  useEffect(() => {
    async function load() {
      const data = await Getdatatasks()
      setdata(data || [])
      const data2 = await Getdatauser()
      setusertask(data2 || [])
      const data3 = await Getminicards()
      setmini(data3 || [])

      setLoading(false)
    }

    load()
  }, [])

  return (
    <section className='Dashboard-layout'>
      <SideBar />
      <main className='dashboard-content'>
        <section className='dashboard-header CardStyle'>
          <div className='dashboard-title'>
            <h2>Statistics</h2>
            <p>Dashboard overview</p>
          </div>
        </section>

        <section className='charts-grid'>
          <div className='chart-card CardStyle'>
            <h3>Total Tasks</h3>
            <MyChart data={data} />
          </div>

          <div className='chart-card CardStyle'>
            <h3>Tasks completed by user</h3>
            <MyChart data={usertask} />
          </div>
        </section>

        <section className='minicards'>
          {
            loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress color='white' /></div>
          }
          {
            !loading && hasuser && <MinicardMpa data={minicards} />
          }
        </section>
      </main>
    </section>
  )
}
