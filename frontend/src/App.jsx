import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobseeker from "./pages/Jobseeker";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import Postjob from "./pages/Postjob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Private */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/list" element={<Dashboard />} />
            <Route path="/jobseeker" element={<Jobseeker />} />
            <Route path="/jobseeker/list" element={<Jobseeker />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/list" element={<Companies />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/list" element={<Jobs />} />
            <Route path="/jobs/postjob" element={<Postjob />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;