const Sidebar = ({ setActivePage, logout }) => {

  const SidebarButton = ({ label, pageKey }) => (
    <button
      onClick={() => setActivePage(pageKey)}
      className="w-full text-left px-4 py-2 rounded-md
                 hover:bg-emerald-50 transition font-medium text-slate-700"
    >
      {label}
    </button>
  );

  return (
    <aside className="w-72 bg-white border-r p-6 space-y-3">
      <h2 className="text-xl font-semibold text-emerald-700 mb-6">
        Student Dashboard
      </h2>

      <SidebarButton label="Dashboard" pageKey="dashboard" />
      <SidebarButton label="My Profile" pageKey="profile" />
      <SidebarButton label="Upload Resume" pageKey="resume" />
      <SidebarButton label="Matched Internships" pageKey="internships" />
      <SidebarButton label="Application Status" pageKey="status" />
      <SidebarButton label="Mentor Details" pageKey="mentor" />

      <button
        onClick={logout}
        className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-md
                   hover:bg-emerald-700 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
