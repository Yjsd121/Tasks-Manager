export function UsersTable({ users }) {
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
                : Math.round(
                  (user.completed_tasks / user.assigned_tasks) * 100
                )

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
                  <div className='progress-container'>
                    <div
                      className='progress-bar'
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </td>
                <td>
                  <button className='btn-table' onClick={() => { }}>edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
