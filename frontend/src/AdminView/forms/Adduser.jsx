import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'

const InitialUser = {
  Name: '',
  LastName: '',
  Email: '',
  Password: '',
  Role: '',
  Img: ''
}

export function AddUserForm({ user, onCancel, onSave }) {
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
  const isEditinng = Boolean(user?.Client_id)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)

  function handleImage(e) {
    const file = e.target.files[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }
  return (
    <form className='custom-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <p className='form-label'>Name</p>
        <input
          className='form-input'
          name='Name'
          placeholder='Name'
          value={formData.User_names}
          onChange={handleChange}
          required
        />
        <p className='form-label'>LastName</p>
        <input
          className='form-input'
          name='LastName'
          placeholder='LastName'
          value={formData.User_lastnames}
          onChange={handleChange}
          required
        />
        <p className='form-label'>Email</p>
        <input
          className='form-input'
          name='Email'
          placeholder='Email'
          value={formData.User_email}
          onChange={handleChange}
          required
        />
        <p className='form-label'>Password</p>
        <input
          className='form-input'
          name='Password'
          placeholder='Password'
          value={formData.Password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='select-container'>
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
        <label className='upload-image'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImage}
            name='Img'
            value={formData.Img}
          />
          <span>Seleccionar imagen</span>
        </label>
        <img
          className='profile-preview'
          src={preview || (isEditinng ? `http://localhost:3000/uploads/${formData.Img_rute}` : '/UserDefault.png')}
          alt='img profile'
        />
      </div>
      <div className='form-actions'>
        <button className='secondary-btn' type='button' onClick={onCancel}>Close</button>
        <button className='primary-btn' type='submit'>{isEditinng ? 'Update' : 'Add'}</button>
      </div>
    </form>
  )
}
