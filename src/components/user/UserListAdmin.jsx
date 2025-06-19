
import { useEffect, useState } from "react"
import { GetAllUsers } from "../../managers/UserManager.js"
import { User } from "./User.jsx"

export const UserListAdmin = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    GetAllUsers().then(setUsers)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh"
      }}
    >
      <table
        className="table is-striped is-fullwidth"
        style={{
          width: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          background: "#fff"
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Author</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User
              key={user.id}
              user={user}
              extraColumns={(user) => (
                <>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.active === 1}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.isAuthor === 1 || user.isAdmin === 1}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.isAdmin === 1}
                      disabled
                    />
                  </td>
                </>
              )}
            />
          ))}

        </tbody>
      </table>
    </div>
  )
}
