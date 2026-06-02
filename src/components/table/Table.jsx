export function UsersTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Rol</th>
          <th>Asignadas</th>
          <th>Completadas</th>
          <th>Progreso</th>
          <th>Acciones</th>
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
              <td>{user.role}</td>
              <td>{user.assigned}</td>
              <td>{user.completed}</td>
              <td>{progress}%</td>
              <td>
                Editar
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
