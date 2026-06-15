import { Searchfilters } from '../../../components/search-filters/filtersBar'
import { SideBar } from '../../components/SideBar/SideBar'
import '../UserView/AdminView.css'
export function Mytasks() {
  return (
    <section className='AdminView-container'>
      <SideBar />
      <main className='admin-content'>
        <Searchfilters />
      </main>
    </section>

  )
}
