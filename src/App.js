import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTask from "./components/add-task.component";
import Task from "./components/task.component";
import TasksList from "./components/tasks-list.component";

class App extends Component {

  render() {
  return (
  <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to="/tasks" className="navbar-brand">
                Test de Coopeuch
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/tasks" className="nav-link">
                    Tareas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">
                    Agregar
                  </Link>
                </li>
              </div>
            </nav>

            <div className="container mt-3">
              <Routes>
                <Route exact path="/" element={<TasksList />} />
                <Route exact path="/tasks" element={<TasksList />} />
                <Route exact path="/add" element={<AddTask />} />
                <Route path="/tasks/:id" element={<Task />} loader={({ params }) => {
                                                                       console.log(params.id); // "hotspur"
                                                                     }} action={({ params }) => {}} />
              </Routes>
            </div>
    </BrowserRouter>
  );
  }
}

export default App;
