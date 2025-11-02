import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.tsx";
import AIAssistant from "./pages/AIAssistant.tsx";
import React from "react";


const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container-fluid px-3">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 text-primary fw-bold" to="/">
            <i className="bi bi-mortarboard-fill fs-4"></i>
            StudyMate
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ai" className="nav-link">
                  AI Assistant
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
