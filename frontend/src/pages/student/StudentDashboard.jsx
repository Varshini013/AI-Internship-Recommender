import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

/* ===== COMPONENTS ===== */
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import ProfilePage from "./components/ProfilePage";
import ResumeUpload from "./components/ResumeUpload";
import InternshipList from "./components/InternshipList";
import ApplicationStatus from "./components/ApplicationStatus";
import MentorDetails from "./components/MentorDetails";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ===== DASHBOARD STATS ===== */
  const [stats, setStats] = useState({
    applied: 0,
    selected: 0,
    rejected: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    if (activePage === "dashboard") {
      fetchDashboardStats();
    }
  }, [activePage]);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/student/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  /* ===== PAGE RENDERER ===== */
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome stats={stats} />;
      case "profile":
        return <ProfilePage />;
      case "resume":
        return <ResumeUpload setActivePage={setActivePage} />;
      case "internships":
        return <InternshipList />;
      case "status":
        return <ApplicationStatus />;
      case "mentor":
        return <MentorDetails />;
      default:
        return <DashboardHome stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen relative bg-transparent">
      
      {/* ===== FIXED SIDEBAR (STATIC) ===== */}
      <aside className="fixed top-0 left-0 h-screen w-72 bg-white border-r shadow-sm z-30">
        <Sidebar
          setActivePage={setActivePage}
          logout={logout}
        />
      </aside>

      {/* ===== MAIN CONTENT (SCROLLABLE) ===== */}
      <main className="ml-72 min-h-screen p-8 overflow-y-auto bg-transparent">
        {renderPage()}
      </main>

    </div>
  );
};

export default StudentDashboard;
