import react from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from "./src/components/DashBoard";
import DeveloperDashboard from "./src/DashBoardpages/DeveloperDashboard";
import AuthPage from "./src/components/AuthPage";
import RolePage from "./src/components/RolePage";
import DeveloperProfilePage from "./src/components/DeveloperProfilePage";
import RecruiterProfilePage from "./src/components/RecruiterProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/role" element={<RolePage />} />
                <Route path="/developer-profile" element={<DeveloperProfilePage />} />
                <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
                <Route path="/recruiter-profile" element={<RecruiterProfilePage />} />
            </Routes>
        </Router>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);