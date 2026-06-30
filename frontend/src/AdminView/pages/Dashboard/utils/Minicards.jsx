export function MinicardMpa({ data }) {
  return (
    data.map(user => {
      const progress =
        user.asignadas === 0
          ? 0
          : Math.round(
            (user.completed / user.asignadas) * 100
          )
      return (
        <div key={user.id} className='minicard CardStyle'>
          <img className='icon' src='/TasksIcon.png' />
          <div style={{ width: '100%' }}>
            <div className='tiitle-tasks'>
              <p>{user.nombre}</p>
              {progress}%
            </div>
            <div className='progress-container'>
              <div className='progress-bar' style={{ width: `${progress}%` }} />
            </div>
            <div className='tasks-cont'>
              <p>{user.asignadas} asignadas </p>
              <p style={{ color: 'green' }}> {user.completed} ✅ </p>
              <p style={{ color: 'orange' }}> {user.pending} ⌛ </p>
            </div>
          </div>
        </div>
      )
    })
  )
}
