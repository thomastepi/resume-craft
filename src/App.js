import { useEffect, useRef } from "react";
import "./App.css";
import "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Error,
  Home,
  Login,
  Register,
  GuestLogin,
  Profile,
  Landing,
  ForgotPassword,
  Resetpassword,
  CheckEmail,
  ResetSuccess,
  AIToolkit,
  GenerateResume,
} from "./pages";
import AIResumeAnalyzer from "./components/AIResumeAnalyzer";
import { message } from "antd";
import Templates from "./pages/templates/index";
import TemplatesGallery from "./pages/templates/TemplatesGallery";
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
            <Route path="/guest-login" element={<GuestLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/set-new-password" element={<Resetpassword />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/reset-success" element={<ResetSuccess />} />
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
              path="/templates"
              element={
                <ProtectedRoute>
                  <TemplatesGallery />
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
              path="/ai-toolkit"
              element={
                <ProtectedRoute>
                  <AIToolkit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-toolkit/analyzer"
              element={
                <ProtectedRoute>
                  <AIResumeAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-toolkit/generate"
              element={
                <ProtectedRoute>
                  <GenerateResume />
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

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const shownRef = useRef(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user && !shownRef.current) {
      message.error("You need to log in first.");
      shownRef.current = true;
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
