import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./containers/About";
import CourseView from "./containers/CourseView";
import FinanceView from "./containers/FinanceView";
import Home from "./containers/Home";
import PlanCreate from "./containers/PlanCreate";
import PlanView from "./containers/PlanView";
import ProgramView from "./containers/ProgramView";
import UserCreate from "./containers/UserCreate";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path="/about" Component={About}></Route>
        <Route path="/courses" Component={CourseView}></Route>
        <Route path="/finances" Component={FinanceView}></Route>
        <Route path="/plan/view" Component={PlanView}></Route>
        <Route path="/plan/create" Component={PlanCreate}></Route>
        <Route path="/programs" Component={ProgramView}></Route>
        <Route path="/signup" Component={UserCreate}></Route>
      </Routes>
    </Router>
  );
};

export default App;
