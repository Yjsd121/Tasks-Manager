import { Minichart } from '../components/minichart/minichart'
import { SideBar } from '../components/SideBar/SideBar'
import { UsersTable } from '../components/table/Table'
import './AdminView.css'
import { users } from '../mock/userdata'
export function AdminView() {
  const totalusers = 4
  return (
    <main>
      <section className='AdminView-container'>
        <SideBar />
        <section className='container'>
          <section className='Title-container'>
            <div className='title'>
              <h2>Users Manage</h2>
              <p>{totalusers}  registered users in total</p>
            </div>
            <button>Add User</button>
          </section>
          <Minichart />
          <UsersTable users={users} />
        </section>
      </section>
    </main>
  )
}
