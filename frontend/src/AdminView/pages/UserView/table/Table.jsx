import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
export function UsersTable({ users, onEdit }) {
  return (
    <section className='table-container '>
      <table className='users-table CardStyle'>
        <thead>
          <tr>
            <th>User</th>
            <th>Rol</th>
            <th>Asigned</th>
            <th>Completed</th>
            <th>Progress</th>
            <th>Acction</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => {
            const progress =
              user.assigned_tasks === 0
                ? 0
                : Math.round((user.completed_tasks / user.assigned_tasks) * 100)

            return (
              <tr key={user.Client_id}>
                <td>{user.User_names}</td>
                <td>
                  <span className={`role ${user.Role}`}>
                    {user.Role}
                  </span>
                </td>
                <td>{user.assigned_tasks}</td>
                <td>{user.completed_tasks}</td>
                <td>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                  >
                    <div className='progress-container'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${progress}%`,
                          backgroundColor: progress < 30 ? 'red' : progress > 30 && progress < 60 ? 'orange' : 'green'
                        }}
                      />
                    </div>
                    {progress}%
                  </div>
                </td>
                <td style={{
                  display: 'flex',
                  gap: '.5rem'
                }}
                >
                  <button className='btn-card' onClick={() => { onEdit(user) }}>
                    <EditOutlinedIcon />
                  </button>
                  <button className='btn-card' onClick={() => { }}>
                    <DeleteForeverOutlinedIcon />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
