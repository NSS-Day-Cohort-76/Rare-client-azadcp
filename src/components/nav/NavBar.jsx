import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";


export const NavBar = ({ token, setToken, setCurrentUserId }) => {

  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();


  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

 const handleLogout = () => {
  localStorage.removeItem("rare_token");
  setToken("");
  setCurrentUserId(null);
  navigate("/login");
};

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/home">
          <img src={Logo} height="3rem" alt="Rare Logo" />
          <h1 className="title is-4">Rare Publishing</h1>
        </Link>

        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          onClick={showMobileNavbar}
          ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token && (
            <Link to="/posts" className="navbar-item">
              All Posts
            </Link>
          )}
          {token && (
            <Link to="/posts/postId" className="navbar-item">
              My Posts
            </Link>
          )}
          {token && (
            <Link to="/categories" className="navbar-item">
              Category Manager
            </Link>
          )}
          {token && (
            <Link to="/tags" className="navbar-item">
              Tag Manager
            </Link>
          )}
          {token && (
            <Link to="/users" className="navbar-item">
              User Manager
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button className="button is-outlined" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
