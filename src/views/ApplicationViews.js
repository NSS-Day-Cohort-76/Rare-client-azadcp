import { Route, Routes } from "react-router-dom";
import { Home } from "../components/posts/Home";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AllPostAdmin } from "../components/posts/AllPostAdmin";
// import { MyPostAdmin } from "../components/posts/MyPostAdmin";
import { UserListAdmin } from "../components/user/UserListAdmin";
import { UserProfileAdmin } from "../components/user/UserProfileAdmin";
import { AuthorPosts } from "../components/user/AuthorPosts.jsx";
// import { NavBar } from "../components/nav/NavBar"
import { CategoryManager } from "../components/category/CategoryManagerAdmin";
import { TagManagerAdmin } from "../components/tag/TagManagerAdmin";
import { CreateCategory } from "../components/category/CreateCategory";
import { EditCategoryForm } from "../components/category/EditCategory.jsx";
import { AddPostAdmin } from "../components/posts/AddPostAdmin.jsx";
import { PostDetailAdmin } from "../components/posts/PostDetailAdmin.jsx";
import { CommentViewAdmin } from "../components/comments/CommentViewAdmin.jsx";
import { CategoryPosts } from "../components/category/CategoryPosts.jsx";
import { EditPostAdmin } from "../components/posts/EditPostAdmin.jsx";

export const ApplicationViews = ({ token, setToken, setCurrentUserId, currentUserId }) => {
  
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setCurrentUserId={setCurrentUserId} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/home" element={<Home currentUserId={currentUserId} />} />
          <Route path="/posts" element={<AllPostAdmin token={token} />} />
          <Route path="/users" element={<UserListAdmin token={token} />} />
          {/* <Route path="/posts/:postId" element={<MyPostAdmin />} /> */}
          <Route path="/posts/:postId" element={<PostDetailAdmin />} />
          <Route path="/categories" element={<CategoryManager token={token} />} />
          <Route path="/categories/add" element={<CreateCategory token={token} />} />
          <Route path="/categories/edit/:categoryId" element={<EditCategoryForm token={token}/>}/>
          <Route path="/categories/:categoryId/posts" element={<CategoryPosts token={token}/>} />
          <Route path="/tags" element={<TagManagerAdmin token={token} />} />
          <Route path="/posts/newpost" element={<AddPostAdmin token={token} />} />
          <Route
            path="/users/:userId"
            element={<UserProfileAdmin token={token} currentUserId={currentUserId} />}
          />
          <Route path="/authorposts/:userId" element={<AuthorPosts />} />
          <Route path="/comments/:postId" element={<CommentViewAdmin token={token} />} />
          <Route path="/posts/:postId/edit" element={<EditPostAdmin token={token} />} />
        </Route>
      </Routes>
    </>
  );
};
