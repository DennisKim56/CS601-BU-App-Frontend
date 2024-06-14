import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./containers/About";
import CourseView from "./containers/CourseView";
import FinanceView from "./containers/FinanceView";
import Home from "./containers/Home";
import Login from "./containers/Login";
import PageNotFound from "./containers/PageNotFound";
import PlanCreate from "./containers/PlanCreate";
import PlanView from "./containers/PlanView";
import ProgramView from "./containers/ProgramView";
import UserCreate from "./containers/UserCreate";

import Backdrop from "./components/Backdrop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Config from "./utility/config";
import "./App.css";

const App = () => {
  const [user, setUser] = useState({});
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [planData, setPlanData] = useState({});

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const logout = useCallback(() => {
    setUser(null);
    setPlanData(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("username");
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch(
          Config.BACKEND_URL + "/users/check",
          requestOptions
        );

        if (response.status === 200 && response.ok) {
          const data = await response.json();
          window.localStorage.setItem("userId", data.id);
          window.localStorage.setItem("name", data.name);
          window.localStorage.setItem("username", data.username);
          setUser({
            userId: data.userId,
            name: data.name,
            username: data.username,
            token: token,
          });
        } else {
          logout();
        }
      })();
    } else {
      logout();
    }
  }, [logout]);

  return (
    <>
      <Router>
        <Header toggleNavbar={toggleNavbar} />
        {navbarOpen && (
          <>
            <Backdrop onClick={toggleNavbar} />
            <Navbar logout={logout} toggleNavbar={toggleNavbar} user={user} />
          </>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseView />} />
          {user && (
            <>
              <Route
                path="/finances"
                element={
                  <FinanceView
                    logout={logout}
                    planData={planData}
                    setPlanData={setPlanData}
                  />
                }
              />
              <Route
                path="/plan/view"
                element={
                  <PlanView
                    logout={logout}
                    planData={planData}
                    setPlanData={setPlanData}
                  />
                }
              />
              <Route
                path="/plan/create"
                element={
                  <PlanCreate
                    logout={logout}
                    planData={planData}
                    setPlanData={setPlanData}
                  />
                }
              />
            </>
          )}
          <Route path="/programs" element={<ProgramView />} />
          <Route
            path="/signup"
            element={<UserCreate setUser={setUser} user={user} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
