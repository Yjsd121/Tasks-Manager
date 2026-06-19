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
    setFormData(prevTask => ({
      ...prevTask,
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
    <form onSubmit={handleSubmit}>
      <p>Title</p>
      <input
        name='title'
        placeholder='Title'
        style={{ width: '100%' }}
        value={formData.title}
        onChange={handleChange}
        required
      />
      <p>Description</p>
      <textarea
        name='description'
        placeholder='Desciption'
        value={formData.description}
        onChange={handleChange}
        required
      />
      <div className='filters-container'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>
            <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='priority'
              value={formData.priority}
              label='Priority'
              onChange={handleChange}
              required
            >
              <MenuItem value='high'>high</MenuItem>
              <MenuItem value='medium'>medium</MenuItem>
              <MenuItem value='low'>low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth required>
            <InputLabel id='demo-simple-select-label'>Asigned to</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='assignedTo'
              value={formData.assignedTo}
              label='Asigned to'
              onChange={handleChange}
              required
            >
              {assignedUsers.map(user => (
                <MenuItem key={user} value={user}>{user}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <input
          className='inputTime'
          name='dueDate'
          type='date'
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className='form-error'>{error}</p>}
      <div className='btn-conntainer'>
        <button type='button' onClick={onCancel}>cancel</button>
        <button type='submit'>{isEditing ? 'update' : 'send'}</button>
      </div>
    </form>
  )
}
