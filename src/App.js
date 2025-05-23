import "./App.css";
import "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Error, Home, Login, Register, Profile, Landing } from "./pages";
import Templates from "./pages/templates/index";
import { ResumeProvider } from "./context/ResumeContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResumeProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/templates/:id"
              element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </ResumeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return props.children;
  } else {
    return <Navigate to="/landing" />;
  }
}
