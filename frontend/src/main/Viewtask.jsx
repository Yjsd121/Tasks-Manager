import './Viewtask.css'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { Barnav } from '@/main/components/barnav/barnav'
import { Searchfilters } from '@/components/search-filters/filtersBar'
import { Minichart } from '@/components/minichart/minichart'
import { Modal } from '@/components/modal/modal'

import { AddTask } from '@/main/forms/AddTaskform'
import { Tasksmap } from '@/main/utils/taskmap'

export function Viewtask() {
  const [showmodal, setshow] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const [Tasksdata, setdata] = useState([])
  const [loading, setLoading] = useState(true)

  const hastask = Tasksdata?.length > 0
  const token = window.localStorage.getItem('token')

  async function gettasks() {
    try {
      const response = await fetch('http://localhost:3000/tasksview', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error fetching tasks')
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error(error)
    }
  }

  async function saveTask(taskData) {
    const isEditing = Boolean(taskData.id)
    const response = await fetch(`http://localhost:3000/tasksview${isEditing ? `/${taskData.id}` : ''}`, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(taskData)
    })

    const data = await response.json()

    if (!response.ok) {
      const message = Array.isArray(data.message) ? data.message.join(', ') : data.message
      throw new Error(message || 'Error saving task')
    }

    setdata(prevTasks => {
      if (isEditing) {
        return prevTasks.map(task => task.id === data.data.id ? data.data : task)
      }

      return [...prevTasks, data.data]
    })

    closeModal()
  }

  async function deleteTask(id) {
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

    setdata(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  function openEditModal(task) {
    setSelectedTask(task)
    setshow(true)
  }

  function closeModal() {
    setSelectedTask(null)
    setshow(false)
  }

  useEffect(() => {
    async function loadTasks() {
      const data = await gettasks()
      setdata(data || [])
      setLoading(false)
    }

    loadTasks()
  }, [])

  return (
    <main>
      <Barnav />
      <Minichart />
      <Searchfilters
        showmodal={showmodal}
        setshow={(value) => {
          setSelectedTask(null)
          setshow(value)
        }}
      />
      {
        loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress color='white' /></div>
      }
      {
        !loading && hastask && <Tasksmap tasks={Tasksdata} onDelete={deleteTask} onEdit={openEditModal} />
      }
      {
        !loading && !hastask && <p style={{ textAlign: 'center' }}>Sin tareas</p>
      }
      {
        showmodal && (
          <Modal>
            <AddTask task={selectedTask} onCancel={closeModal} onSave={saveTask} />
          </Modal>
        )
      }
    </main>
  )
}
