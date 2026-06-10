import './Viewtask.css'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { Barnav } from '@/main/components/barnav/barnav'
import { Searchfilters } from '@/components/search-filters/filtersBar'
import { Minichart } from '@/components/minichart/minichart'
import { Modal } from '@/components/modal/modal'

import { AddTask } from '@/main/forms/Addtaskform'
import { Tasksmap } from '@/main/utils/taskmap'

import { tasks } from '@/mock/Tasks'
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
        showmodal && <Modal> <AddTask />  </Modal>
      }
    </main>
  )
}
