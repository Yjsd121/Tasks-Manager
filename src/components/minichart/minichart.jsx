import './minichart.css'
import { stats } from '../../mock/minichart'
export function Minichart() {
  return (
    <section className='minichart-container'>
      {
        stats.map(item => (
          <div
            className='chart'
            style={{
              background: item.color
            }}
            key={item.id}
          >
            <h3>{item.title}</h3>
            <p>{item.quantity}</p>
          </div>
        ))
      }
    </section>
  )
}
