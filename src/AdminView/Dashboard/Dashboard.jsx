import { SideBar } from '../../components/SideBar/SideBar'

export function Dashboard() {
  return (
    <section>
      <section className='AdminView-container'>
        <SideBar />
        <section className='container'>
          <section className='Title-container'>
            <div className='title'>
              <h2>Dashbaord</h2>
              <p>performance per user</p>
            </div>
            <button>Add User</button>
          </section>
          <div>
            hola
          </div>
        </section>
      </section>
    </section>
  )
}
