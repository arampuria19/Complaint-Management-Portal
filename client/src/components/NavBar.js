import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import postContext from "../context/post/postContext";
import loginContext from "./../context/login/loginContext";

const NavBar = () => {
  const contextLogin = useContext(loginContext);
  const { isLoggedIn, logOut } = contextLogin;
  const contextPost = useContext(postContext);
  const { filter, setFilter, resetToDefaultState } = contextPost;

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ marginBottom: "20px" }}
    >
      <div className="container-fluid">
        <div className="navbar-brand">
          Complaint Management Portal
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"&&filter===""?"active":""}`} aria-current="page" onClick={()=>{setFilter(""); resetToDefaultState();navigate("/");}} to="/">
                Home
              </Link>
            </li>
            {isLoggedIn === "loggedin"  && <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filter
              </div>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                <li><div className="dropdown-item" style={{color: "red", cursor: "pointer"}} onClick={()=>{setFilter("&status=0"); resetToDefaultState(); navigate("/");}}>Fresh</div></li>
                <li><div className="dropdown-item" style={{color: "yellow", cursor: "pointer"}} onClick={()=>{setFilter("&status=1"); resetToDefaultState(); navigate("/");}}>Addressed</div></li>
                <li><div className="dropdown-item" style={{color: "green", cursor: "pointer"}} onClick={()=>{setFilter("&status=2"); resetToDefaultState(); navigate("/");}}>Resolved</div></li>
              </ul>
            </li>}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/aboutus"?"active":""}`} to="/aboutus">
                About us
              </Link>
            </li>
          </ul>
          {isLoggedIn === "loggedin" && (
            <Link
              to="/addnew"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <button className="btn btn-outline-success my-2 my-lg-0 mx-2 d-block">
                Add New
              </button>
            </Link>
          )}
          {isLoggedIn === "loggedin" && (
            <button
              className="btn btn-outline-danger my-2 my-lg-0 mx-2 d-block"
              onClick={logOut}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
