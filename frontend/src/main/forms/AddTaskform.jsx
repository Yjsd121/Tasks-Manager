import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import './AddTaskform.css'

const initialTask = {
  title: '',
  description: '',
  priority: '',
  assignedTo: '',
  createdAt: '',
  dueDate: '',
  status: 'pending'
}

const assignedUsers = [
  'Carlos',
  'Yader',
  'Luis',
  'Sofia',
  'Pedro',
  'Ana',
  'David',
  'Jorge',
  'Kevin',
  'Jose'
]

function formatDateInput(date) {
  if (!date) return ''
  return String(date).split('T')[0]
}

export function AddTask({ task, onCancel, onSave }) {
  const [formData, setFormData] = React.useState({
    ...initialTask,
    ...task,
    dueDate: formatDateInput(task?.dueDate)
  })

  const [error, setError] = React.useState('')
  const isEditing = Boolean(task?.id)

  const handleChange = (event) => {
    const { name, value } = event.target
    setError('')
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      await onSave(formData)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form className='custom-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='form-label'>
          Title
        </label>
        <input
          className='form-input'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label className='form-label'>
          Description
        </label>

        <textarea
          className='form-textarea'
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className='select-container'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select
              name='priority'
              value={formData.priority}
              label='Priority'
              onChange={handleChange}
            >
              <MenuItem value='high'>High</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='low'>Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>

            <InputLabel>Assigned to</InputLabel>

            <Select
              name='assignedTo'
              value={formData.assignedTo}
              label='Assigned to'
              onChange={handleChange}
            >
              {assignedUsers.map(user => (
                <MenuItem
                  key={user}
                  value={user}
                >
                  {user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <input
          className='form-input input-date'
          type='date'
          name='dueDate'
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

      </div>

      {error &&
        <p className='form-error'>
          {error}
        </p>}

      <div className='form-actions'>

        <button
          type='button'
          className='secondary-btn'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='primary-btn'
        >
          {isEditing ? 'Update' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}
