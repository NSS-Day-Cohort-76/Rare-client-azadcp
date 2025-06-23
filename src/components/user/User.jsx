import { Link } from "react-router-dom"

export const User = ({ user, extraColumns }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`} className="btn btn-link">
          {user.username}
        </Link>
      </td>

      {/* Insert whatever extra <td>s the parent provides */}
      {extraColumns && extraColumns(user)}
    </tr>
  )
}
