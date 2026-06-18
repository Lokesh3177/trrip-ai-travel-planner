import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthContextProvider from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyTrip from "./pages/myTrips";
import MyTripsList from "./pages/MyTripsList";
import ShareView from "./pages/ShareView";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>

         

          <Route
            path="/"
            element={
              token ? (
                <Navigate
                  to="/dashboard"
                  replace
                />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/register"
            element={
              token ? (
                <Navigate
                  to="/dashboard"
                  replace
                />
              ) : (
                <Register />
              )
            }
          />

        
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-trips"
            element={
              <ProtectedRoute>
                <MyTripsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-trip/:id"
            element={
              <ProtectedRoute>
                <MyTrip />
              </ProtectedRoute>
            }
          />

          

          <Route
            path="/share/:shareId"
            element={<ShareView />}
          />


          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;