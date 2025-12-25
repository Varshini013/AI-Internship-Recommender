import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = ({ stats }) => {
  const chartData = [
    { name: "Applied", value: stats.applied },
    { name: "Selected", value: stats.selected },
    { name: "In Progress", value: stats.inProgress },
    { name: "Completed", value: stats.completed || 0 },
  ];

  return (
    <div className="relative space-y-10">

      {/* ===== FIXED BACKGROUND IMAGE (VISIBLE & STATIC) ===== */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
          opacity: 0.35,
        }}
      />
      <div className="fixed inset-0 bg-white/70 -z-10" />

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Student Dashboard
        </h1>
        <p className="text-slate-600 mt-1">
          Overview of your internship activity and platform capabilities
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Internships Applied"
          value={stats.applied}
          description="Total internships you have applied for"
        />
        <KpiCard
          title="Selected"
          value={stats.selected}
          description="Applications shortlisted or accepted"
        />
        <KpiCard
          title="In Progress"
          value={stats.inProgress}
          description="Applications currently under review"
        />
        <KpiCard
          title="Completed"
          value={stats.completed || 0}
          description="Successfully completed internships"
        />
      </div>

      {/* ================= VISUALIZATION ================= */}
      <div className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-6
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Internship Status Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Platform Features & Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="AI-Based Internship Recommendations"
            description="Your academic profile, skills, interests, and resume are analyzed to recommend the most suitable internships."
          />
          <FeatureCard
            title="Resume Upload & Skill Extraction"
            description="Upload your resume once and allow the system to extract skills automatically."
          />
          <FeatureCard
            title="Application Tracking"
            description="Track the real-time status of every internship application transparently."
          />
          <FeatureCard
            title="Mentor Guidance"
            description="View assigned mentor details and receive structured guidance."
          />
          <FeatureCard
            title="Profile Management"
            description="Maintain academic details such as branch, year, and institution."
          />
          <FeatureCard
            title="Secure & Transparent System"
            description="Role-based access control and secure authentication ensure trust."
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

/* ================= REUSABLE UI COMPONENTS ================= */

const KpiCard = ({ title, value, description }) => (
  <div
    className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl p-6
               shadow-sm hover:shadow-2xl hover:-translate-y-2
               hover:border-emerald-500 transition-all duration-300"
  >
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-3xl font-semibold text-emerald-700 mt-2">
      {value}
    </p>
    <p className="text-sm text-slate-600 mt-2">
      {description}
    </p>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <div
    className="bg-white/80 backdrop-blur border border-slate-200 rounded-xl p-5
               hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1
               transition-all duration-300"
  >
    <h3 className="font-medium text-slate-800 mb-2">
      {title}
    </h3>
    <p className="text-sm text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);
