import { useEffect, useState } from "react";

import { PostTable } from "../shared/PostTable";
import { GetAllUsers } from "../../managers/UserManager";

export const UserListAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetAllUsers().then((data) => {
      // console.log("Fetched users:", data);
      setUsers(data);
    });
  }, []);

  return (
    <PostTable
      rows={users} // ✅
      columns={[
        { key: "id", label: "ID" },
        { key: "first_name", label: "First Name" },
        { key: "last_name", label: "Last Name" },
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
      ]}
      onEdit={(id) => console.log("Edit", id)}
      onDelete={(id) => console.log("Delete", id)}
      isPostTable={false}
    />
  );
};
