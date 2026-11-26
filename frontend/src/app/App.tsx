import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import MyChildrenPage from "../pages/MyChildren";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage/>} />
      <Route path="/my-children" element={<MyChildrenPage/>} />
    </Routes>
  );
}

export default App;