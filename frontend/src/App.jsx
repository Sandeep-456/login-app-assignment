import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";

/**
 * App – Root component
 * Routes:
 *  /          → LoginPage
 *  /welcome   → WelcomePage
 *  *          → redirect to /
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
