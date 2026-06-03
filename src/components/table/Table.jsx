export function UsersTable({ users }) {
  return (
    <section className='table-container'>
      <table className='users-table'>
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
              user.assigned === 0
                ? 0
                : Math.round(
                  (user.completed / user.assigned) * 100
                )

            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <span className={`role ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.assigned}</td>
                <td>{user.completed}</td>
                <td>
                  <div className='progress-container'>
                    <div
                      className='progress-bar'
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {progress} %
                </td>
                <td>
                  <button className='btn-table'>edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
