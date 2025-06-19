import { Link } from "react-router-dom"

export const User = ({ user }) => {
    return (
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Active</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Link to={`/users/${user.id}`} className="btn btn-link">
                        {user.username}
                        </Link>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            checked={user.active === 1}
                            disabled
                        />
                    </td>
                   
                </tr>
            </tbody>
        </table>
    )
}