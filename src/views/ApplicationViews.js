import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllPostAdmin } from "../components/posts/AllPostAdmin"
import { UserListAdmin } from "../components/user/UserListAdmin"
import { UserProfileAdmin } from "../components/user/UserProfileAdmin"
import { NavBar } from "../components/nav/NavBar"

import { CategoryManager } from "../components/category/CategoryManagerAdmin"

import { TagManagerAdmin } from "../components/tag/TagManagerAdmin"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/posts" element={<AllPostAdmin token={token} />} />
        <Route path="/users" element={<UserListAdmin token={token} />}/>

        <Route path="/categories" element={<CategoryManager token={token} />}/>


        <Route path="/tags" element={<TagManagerAdmin token={token} />} />

        <Route path="/users/:userId" element={<UserProfileAdmin />} />


      </Route>
    </Routes>
  </>
}


