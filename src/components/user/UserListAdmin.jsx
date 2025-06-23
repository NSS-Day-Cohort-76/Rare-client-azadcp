import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllUsers } from "../../managers/UserManager.js";

export const UserListAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}>
      <table
        className="table is-striped is-fullwidth"
        style={{
          width: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          background: "#fff",
        }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Author</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userObj) => (
            <tr key={userObj.id}>
              <td>
                <Link to={`/users/${userObj.id}`} className="btn btn-link">
                  {userObj.username}
                </Link>
              </td>
              <td>
                <input type="checkbox" checked={userObj.active === 1} disabled />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={userObj.author === true || userObj.admin === true}
                  disabled
                />
              </td>
              <td>
                <input type="checkbox" checked={userObj.admin === true} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
