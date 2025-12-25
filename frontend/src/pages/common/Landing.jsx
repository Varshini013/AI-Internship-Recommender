import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiArrowRight,
} from "react-icons/hi2";

const Landing = () => {
  return (
    <div className="relative min-h-screen text-slate-800 leading-relaxed">

      {/* ================= GLOBAL STATIC BACKGROUND ================= */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/src/assets/hero-bg.webp')" }}
      />

      {/* ================= GLOBAL TRANSPARENCY OVERLAY ================= */}
      <div className="fixed inset-0 bg-white/70 -z-10" />

      {/* ================= PAGE CONTENT ================= */}
      <div className="relative">

        {/* ================= HEADER ================= */}
        <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-emerald-700 tracking-wide">
              PM Internship Portal
            </h1>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <NavItem label="Overview" />
              <NavItem label="Features" />
              <NavItem label="How It Works" />
              <NavItem label="Contact" />
              <Link
                to="/login"
                className="px-5 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
              >
                Login
              </Link>
            </nav>
          </div>
        </header>

        {/* ================= HERO ================= */}
        <section className="max-w-7xl mx-auto px-8 py-28 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-emerald-700 mb-4">
              Ministry of Corporate Affairs Initiative
            </p>

            <h2 className="text-5xl font-semibold leading-tight mb-8">
              A National Digital Platform for <br />
              <span className="text-emerald-700">
                Smart Internship Allocation
              </span>
            </h2>

            <p className="text-lg text-slate-700 max-w-xl mb-10">
              PM Internship Portal is an AI-assisted system designed to ensure
              transparent, inclusive, and efficient internship recommendations
              for students across India, including rural and underserved regions.
            </p>

            <div className="flex gap-4">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-md"
              >
                Get Started
                <HiArrowRight className="group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/about"
                className="px-7 py-3 rounded-md border border-slate-300 hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Metrics Card */}
          <div className="bg-white/85 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 shadow-md hover:shadow-lg transition">
            <div className="grid grid-cols-2 gap-10">
              <Stat value="10,000+" label="Registered Students" />
              <Stat value="1,200+" label="Internship Opportunities" />
              <Stat value="600+" label="Active Mentors" />
              <Stat value="95%" label="Matching Accuracy" />
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="bg-white/90 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-24">
            <h3 className="text-3xl font-semibold mb-6">The Challenge</h3>
            <p className="text-slate-600 max-w-4xl text-lg">
              Thousands of students, especially first-generation learners,
              struggle to identify suitable internship opportunities due to
              limited exposure, lack of guidance, and overwhelming choices.
            </p>
          </div>
        </section>

        {/* ================= SOLUTION ================= */}
        <section className="bg-slate-50/90">
          <div className="max-w-7xl mx-auto px-8 py-24">
            <h3 className="text-3xl font-semibold mb-6">Our Solution</h3>
            <p className="text-slate-600 max-w-4xl text-lg">
              The PM Internship Portal uses lightweight AI and rule-based
              intelligence to recommend the most relevant internships.
            </p>
          </div>
        </section>

        {/* ================= CAPABILITIES ================= */}
        <section className="bg-white/90 border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-24">
            <h3 className="text-3xl font-semibold text-center mb-16">
              Platform Capabilities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Capability
                icon={<HiOutlineAcademicCap />}
                title="Student-Centric Design"
                text="Simple interfaces and mobile-first accessibility."
              />
              <Capability
                icon={<HiOutlineUsers />}
                title="Mentor Monitoring"
                text="Track progress and guide students effectively."
              />
              <Capability
                icon={<HiOutlineBriefcase />}
                title="Administrative Control"
                text="Centralized internship and user management."
              />
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="bg-slate-50/90">
          <div className="max-w-7xl mx-auto px-8 py-24">
            <h3 className="text-3xl font-semibold text-center mb-16">
              How the Platform Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <Step step="01" text="User registration & role selection" />
              <Step step="02" text="Profile creation & skill input" />
              <Step step="03" text="AI-based internship recommendation" />
              <Step step="04" text="Mentor guidance & progress tracking" />
            </div>
          </div>
        </section>

        {/* ================= TRUST ================= */}
        <section className="bg-white/90 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-24">
            <h3 className="text-3xl font-semibold text-center mb-16">
              Trust, Security & Accessibility
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Trust
                icon={<HiOutlineShieldCheck />}
                title="Data Security"
                text="Secure authentication and role-based access control."
              />
              <Trust
                icon={<HiOutlineGlobeAlt />}
                title="Inclusive Access"
                text="Optimized for low bandwidth and regional language support."
              />
              <Trust
                icon={<HiOutlineUsers />}
                title="Transparent Governance"
                text="Clear workflows and accountability."
              />
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-8 py-20 text-center">
            <h3 className="text-3xl font-semibold mb-6">
              Empowering India’s Youth Through Opportunity
            </h3>
            <p className="text-emerald-100 max-w-3xl mx-auto mb-10">
              Building equitable access to skill development and internships.
            </p>

            <Link
              to="/signup"
              className="inline-block px-8 py-3 rounded-md bg-white text-emerald-700 font-medium hover:bg-slate-100 transition shadow"
            >
              Register Now
            </Link>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-white/90 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-6 text-sm text-slate-500 text-center">
            © {new Date().getFullYear()} PM Internship Portal · Ministry of Corporate Affairs
          </div>
        </footer>

      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const NavItem = ({ label }) => (
  <span className="cursor-pointer text-slate-600 hover:text-emerald-700 transition">
    {label}
  </span>
);

const Stat = ({ value, label }) => (
  <div>
    <p className="text-2xl font-semibold text-emerald-700">{value}</p>
    <p className="text-sm text-slate-500 mt-1">{label}</p>
  </div>
);

const Capability = ({ icon, title, text }) => (
  <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50/90 hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all">
    <div className="text-4xl text-emerald-600 mb-5">{icon}</div>
    <h4 className="text-xl font-semibold mb-3">{title}</h4>
    <p className="text-slate-600">{text}</p>
  </div>
);

const Step = ({ step, text }) => (
  <div className="border border-slate-200 rounded-2xl p-8 bg-white/90 hover:-translate-y-1 hover:shadow-md transition-all">
    <p className="text-emerald-600 text-sm font-medium mb-2">STEP {step}</p>
    <p className="text-lg font-medium">{text}</p>
  </div>
);

const Trust = ({ icon, title, text }) => (
  <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50/90 hover:bg-white hover:shadow-md transition">
    <div className="text-4xl text-emerald-600 mb-5">{icon}</div>
    <h4 className="text-xl font-semibold mb-3">{title}</h4>
    <p className="text-slate-600">{text}</p>
  </div>
);

export default Landing;
