import './Viewtask.css'
import { Barnav } from '../components/barnav/barnav'
import { tasks } from '../mock/Tasks'
import { Searchfilters } from '../components/search-filters/filtersBar'
import { Minichart } from '../components/minichart/minichart'
import { Modal } from '../components/modal/modal'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { Tasksmap } from './taskmap'
export function Viewtask() {
  const [showmodal, setshow] = useState(false)
  const hastask = tasks?.length > 0
  return (
    <main>
      <Barnav />
      <Minichart />
      <Searchfilters showmodal={showmodal} setshow={setshow} />
      {
        hastask
          ? <Tasksmap tasks={tasks} />
          : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress color='white' /></div>
      }
      {
        showmodal && <Modal>  </Modal>
      }
    </main>
  )
}
