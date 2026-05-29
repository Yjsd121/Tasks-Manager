import './modal.css'
export function Modal({ children }) {
  return (
    <section className='layout'>
      <div className='modal-container'>
        {children}
      </div>
    </section>
  )
}
