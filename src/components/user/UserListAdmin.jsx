import { useEffect, useState } from "react";

import { PostTable } from "../shared/PostTable.js";
import { GetAllUsers } from "../../managers/UserManager.js";

export const UserListAdmin = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    GetAllUsers().then((data) => {
      console.log("Fetched users:", data);
      setUsers(data);
      
    });
  }, []);

 console.log(users)

  return (
    <PostTable
      posts={users}
      onEdit={(id) => console.log("Edit", id)}
      onDelete={(id) => console.log("Delete", id)}
     
    />
  );
};