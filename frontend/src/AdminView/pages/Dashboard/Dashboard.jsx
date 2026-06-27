import './Dashboard.css'
import { useEffect, useState } from 'react'

import { SideBar } from '../../components/SideBar/SideBar.jsx'
import MyChart from '../../components/barchar.jsx'

import { usersMiniCards } from '@/mock/userdata2.js'

export function Dashboard() {
  const [data, setdata] = useState()
  const [usertask, setusertask] = useState()
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
    console.log(data)
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
    const data2 = await response.json()
    console.log(data2)
    return data2.data
  }

  useEffect(() => {
    async function load() {
      const data = await Getdatatasks()
      setdata(data || [])
    }
    load()
  }, [])

  useEffect(() => {
    async function load() {
      const data = await Getdatauser()
      setusertask(data || [])
    }
    load()
  }, [])

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

        <section className='charts-grid'>
          <div className='chart-card'>
            <h3>Total Tasks</h3>
            <MyChart data={data} />
          </div>

          <div className='chart-card'>
            <h3>Tasks completed by user</h3>
            <MyChart data={usertask} />
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
