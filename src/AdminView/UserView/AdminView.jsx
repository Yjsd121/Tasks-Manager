import { Minichart } from '../../components/minichart/minichart'
import { SideBar } from '../../components/SideBar/SideBar'
import { UsersTable } from '../../components/table/Table'
import './AdminView.css'
import { users } from '../../mock/userdata'
import { useState } from 'react'
import { Modal } from '../../components/modal/modal'

export function AdminView() {
  const totalusers = users.length
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
          <UsersTable users={users} />
        </section>

        {
          show && <Modal />
        }
      </main>
    </section>
  )
}
