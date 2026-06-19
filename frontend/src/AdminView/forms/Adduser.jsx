import './adduser.css'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'

const InitialUser = {
  Name: '',
  Email: '',
  Password: '',
  Role: ''
}

export function AddUserForm({ user, onCancel }) {
  const [formData, setFormData] = useState({
    ...InitialUser,
    ...user
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevTask => ({
      ...prevTask,
      [name]: value
    }))
  }
  const handleSubmit = () => {
    console.log(formData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='InfoData-container'>
        <p>Name</p>
        <input
          name='Name'
          placeholder='Name'
          value={formData.Name}
          onChange={handleChange}
          required
        />
        <p>Emaiil</p>
        <input
          name='Email'
          placeholder='Email'
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <p>Password</p>
        <input
          name='Password'
          placeholder='Password'
          value={formData.Password}
          onChange={handleChange}
          required
        />
      </div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth required>
          <InputLabel id='demo-simple-select-label'>Role</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='Role'
            value={formData.Role}
            label='Role'
            onChange={handleChange}
            required
          >
            <MenuItem value='admin'>admin</MenuItem>
            <MenuItem value='supervisor'>supervisor</MenuItem>
            <MenuItem value='Employee'>Employee</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <button type='button' onClick={onCancel}>Close</button>
      <button type='submit'>add</button>
    </form>
  )
}
