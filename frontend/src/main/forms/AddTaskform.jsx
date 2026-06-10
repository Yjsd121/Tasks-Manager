import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import './AddTaskform.css'

export function AddTask() {
  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }
  return (
    <form>
      <p>Title</p>
      <input placeholder='Title' style={{ width: '100%' }} />
      <p>Description</p>
      <textarea placeholder='Desciption' />
      <div className='filters-container'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              label='Priority'
              onChange={handleChange}
            >
              <MenuItem value='high'>high</MenuItem>
              <MenuItem value='midium'>midium</MenuItem>
              <MenuItem value='low'>low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Asigned to</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              label='Asigned to'
              onChange={handleChange}
            >
              <MenuItem value='yader'>yader</MenuItem>
              <MenuItem value='Carlos'>Carlos</MenuItem>
              <MenuItem value='Kevin'>Kevin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <input className='inputTime' type='date' />
      </div>
      <div className='btn-conntainer'>
        <button>cancel</button>
        <button>send</button>
      </div>
    </form>
  )
}
