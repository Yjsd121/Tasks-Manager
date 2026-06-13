import { Minichart } from '@/components/minichart/minichart'
import { SideBar } from '@/AdminView/components/SideBar/SideBar'
import { UsersTable } from '@/AdminView/components/table/Table'
import './AdminView.css'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/modal/modal'
import { useNavigate } from 'react-router-dom'

export function AdminView() {
  const [data, setdata] = useState([])
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate()

  async function getusers() {
    const response = await fetch('http://localhost:3000/Adminview/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      if (response.statusText === 'Unauthorized') {
        navigate('/')
      }
      throw new Error('Error fetching tasks')
    }

    const info = await response.json()
    console.log(info)
    return info.data
  }
  useEffect(() => {
    async function loaddata() {
      const data = await getusers()
      setdata(data || [])
    }

    loaddata()
  }, [])

  const totalusers = data.length
  const [show, setshow] = useState(false)

  return (
    <section className='AdminView-container'>
      <SideBar />
      <main className='admin-content'>
        <section className='header-card'>
          <div className='title'>
            <h2>Gestión de Usuarios</h2>
            <p>{totalusers} usuarios registrados</p>
          </div>

          <button onClick={() => { setshow(true) }} className='btn-add-user'>
            Nuevo Usuario
          </button>
        </section>

        <section className='stats-section'>
          <Minichart />
        </section>

        <section className='table-section'>
          <UsersTable users={data} />
        </section>

        {
          show && <Modal />
        }
      </main>
    </section>
  )
}
