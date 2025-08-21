import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import LogisticsPage from "../pages/LogisticsPage.jsx";
import ShippinglinePage from "../pages/ShippinglinePage.jsx";
import Actionbar from "../components/Actionbar.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("login"); // Initialize activeSection

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Pass activeSection and setActiveSection to Home */}
        <Route
          path="/"
          element={
            <Home
              onLogin={setUser}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          }
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Actionbar role="admin">
                <AdminPage />
              </Actionbar>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/logistics"
          element={
            user?.role === "logistics" ? (
              <Actionbar role="logistics">
                <LogisticsPage />
              </Actionbar>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/shippingline"
          element={
            user?.role === "shippingline" ? (
              <Actionbar role="shippingline">
                <ShippinglinePage />
              </Actionbar>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
