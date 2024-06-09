import { useEffect, useState } from "react";
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

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (Object.keys(user).length === 0) {
    }
  }, []);

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseView />} />
          <Route path="/finances" element={<FinanceView />} />
          <Route path="/plan/view" element={<PlanView />} />
          <Route path="/plan/create" element={<PlanCreate />} />
          <Route path="/programs" element={<ProgramView />} />
          <Route path="/signup" element={<UserCreate />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
