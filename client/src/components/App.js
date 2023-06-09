import "../styles/App.css";
import React, { useContext } from "react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import Post from "./Post";
import Login from "./Login";
import BottomBar from "./BottomBar";
import AboutUs from "./AboutUs";
import PostDetails from "./PostDetails";
import loginContext from "./../context/login/loginContext";
import loadingBarContext from "./../context/loadingBar/loadingBarContext"
import Spinner from "./Spinner";
import { useEffect } from "react";
import axios from "axios";
import { HOST } from "../constants";
import AddNewPost from "./AddNewPost";
import Alert from "./Alert";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const contextLogin = useContext(loginContext);
  const { isLoggedIn, setIsLoggedIn } = contextLogin;
  const contextLoadingBar = useContext(loadingBarContext);
  const {progress, setProgress} = contextLoadingBar;

  useEffect(() => {
    async function getLoginStatus() {
      try {
        const LOGIN_CHECK_ENDPOINT = `${HOST}/api/v1/users/is-logged-in`;
        const response = await axios.get(LOGIN_CHECK_ENDPOINT, {
          withCredentials: true,
          credentials: "include",
        });
        if (response.data.status === "success") {
          localStorage.setItem("loggedInUserId", response.data.user);
          localStorage.setItem("role", response.data.role);
          setIsLoggedIn("loggedin");
        } else setIsLoggedIn("loggedout");
      } catch (err) {
        setIsLoggedIn("loggedout");
      }
    }
    getLoginStatus();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <NavBar />
      <Alert />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn === "loggedin" ? (
                <Post />
              ) : isLoggedIn === "loggedout" ? (
                <Login />
              ) : (
                <Spinner />
              )
            }
          />
          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/postdetails/:id" element={<PostDetails />} />
          <Route path="/addnew" element={<AddNewPost />} />
        </Routes>
      </div>
      <BottomBar />
    </div>
  );
};

export default App;
