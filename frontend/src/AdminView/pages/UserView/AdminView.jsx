import { SideBar } from '@/AdminView/components/SideBar/SideBar'
import { UsersTable } from './table/Table'
import './AdminView.css'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/modal/modal'
import { useNavigate } from 'react-router-dom'
import { AddUserForm } from '../../forms/Adduser'

export function AdminView() {
  const [data, setdata] = useState([])
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate()

  const [editData, setEdit] = useState(null)

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
    return info.data
  }

  async function saveuser(user) {
    const isEditng = Boolean(user.id)
    const response = await fetch(`http://localhost:3000/Adminview${isEditng ? `/${user.id}` : ''}`, {
      method: isEditng ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()

    if (!response.ok) {
      const message = Array.isArray(data.message) ? data.message.join(', ') : data.message
      throw new Error(message || 'Error saving user')
    }

    setdata(prevUser => {
      if (isEditng) {
        return prevUser.map(user => user.id === data.data.id ? data.data : user)
      }

      return [...prevUser, data.data]
    })

    CloseModal()
  }

  async function deleteUser(id) {
    const response = await fetch(`http://localhost:3000/tasksview/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Error deleting task')
    }

    setdata(prevUser => prevUser.filter(User => User.id !== id))
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

  function OpenEditmodal(data) {
    setEdit(data)
    setshow(true)
  }
  function CloseModal() {
    setEdit(null)
    setshow(false)
  }
  return (
    <section className='AdminView-container'>
      <SideBar />
      <main className='admin-content'>
        <section className='header-card CardStyle'>
          <div className='title'>
            <h2>Gestión de Usuarios</h2>
            <p>{totalusers} usuarios registrados</p>
          </div>

          <button onClick={() => { setshow(true) }} className='btn-add-user'>
            Nuevo Usuario
          </button>
        </section>

        <section className='table-section'>
          <UsersTable users={data} onEdit={OpenEditmodal} onDelete={deleteUser} />
        </section>

        {
          show && (
            <Modal>
              <AddUserForm
                user={editData}
                onCancel={CloseModal}
                onSave={saveuser}
              />
            </Modal>
          )
        }
      </main>
    </section>
  )
}
