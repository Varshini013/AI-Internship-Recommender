import { useNavigate, Outlet } from "react-router-dom";

const StudentLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-72 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-semibold text-emerald-700 mb-6">
          Student Panel
        </h2>

        <SidebarBtn label="Dashboard" onClick={() => navigate("/student")} />
        <SidebarBtn label="Profile" onClick={() => navigate("/student/profile")} />
        <SidebarBtn label="Upload Resume" onClick={() => navigate("/student/resume")} />
        <SidebarBtn label="Internships" onClick={() => navigate("/student/internships")} />
        <SidebarBtn label="Status" onClick={() => navigate("/student/status")} />
        <SidebarBtn label="Mentor" onClick={() => navigate("/student/mentor")} />

        <button
          onClick={logout}
          className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
        >
          Logout
        </button>
      </aside>

      {/* ===== PAGE CONTENT ===== */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;

const SidebarBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 rounded-md hover:bg-emerald-50 transition"
  >
    {label}
  </button>
);
