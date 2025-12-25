import { useEffect, useState } from "react";
import API, { uploadConfig } from "../../../services/api";

const YEARS = ["1", "2", "3", "4"];

const BRANCHES = [
  "Computer Science and Engineering",
  "CSE - AI & ML",
  "CSE - Data Science",
  "Information Technology",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "CIC",
];

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);

  /* ===== FETCH PROFILE ===== */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/student/profile");
      setProfile(res.data);
    } catch {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  /* ===== INPUT CHANGE ===== */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* ===== UPDATE PROFILE ===== */
  const updateProfile = async () => {
    try {
      setSaving(true);
      await API.put("/student/profile", {
        ...profile,
        skills: profile.skills?.split(",").map(s => s.trim()),
      });
      alert("Profile updated successfully");
    } catch {
      alert("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ===== UPLOAD PROFILE IMAGE ===== */
  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    await API.post("/student/upload-profile-image", formData, uploadConfig);
    fetchProfile();
  };

  /* ===== UPLOAD RESUME ===== */
  const uploadResume = async () => {
    if (!resume) return;
    const formData = new FormData();
    formData.append("resume", resume);
    await API.post("/student/upload-resume", formData, uploadConfig);
    alert("Resume uploaded successfully");
  };

  /* ===== DELETE ACCOUNT ===== */
  const deleteAccount = async () => {
    if (!confirm("This will permanently delete your account. Continue?")) return;
    await API.delete("/student/profile");
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="space-y-10 max-w-5xl">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">My Profile</h1>
        <p className="text-slate-600 mt-1">
          Manage your academic, personal, and professional details
        </p>
      </div>

      {/* ===== PROFILE CARD ===== */}
      <div className="bg-white/90 backdrop-blur border rounded-2xl p-8 shadow-sm">

        {/* ===== PROFILE IMAGE ===== */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={profile.profileImage || "/default-avatar.png"}
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            <button onClick={uploadImage} className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md">
              Upload Photo
            </button>
          </div>
        </div>

        {/* ===== FORM ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input label="Full Name" name="name" value={profile.name} onChange={handleChange} />
          <Input label="Email" name="email" value={profile.email} disabled />

          <Select label="Year" name="year" value={profile.year || ""} options={YEARS} onChange={handleChange} />
          <Select label="Branch" name="branch" value={profile.branch || ""} options={BRANCHES} onChange={handleChange} />

          <Input label="CGPA" name="cgpa" value={profile.cgpa || ""} onChange={handleChange} />
          <Input label="Roll Number" name="rollNumber" value={profile.rollNumber || ""} onChange={handleChange} />

          <Input label="Address" name="address" value={profile.address || ""} onChange={handleChange} />

          <Input
            label="Skills (comma separated)"
            name="skills"
            value={profile.skills?.join(", ") || ""}
            onChange={handleChange}
          />

        </div>

        {/* ===== TEXT AREAS ===== */}
        <div className="mt-6 space-y-4">
          <Textarea label="Projects" name="projects" value={profile.projects || ""} onChange={handleChange} />
          <Textarea label="About Me" name="description" value={profile.description || ""} onChange={handleChange} />
        </div>

        {/* ===== RESUME ===== */}
        <div className="mt-6">
          <label className="block text-sm font-medium">Upload Resume (PDF)</label>
          <input type="file" accept=".pdf" onChange={e => setResume(e.target.files[0])} />
          <button onClick={uploadResume} className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md">
            Upload Resume
          </button>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="flex gap-4 mt-10">
          <button onClick={updateProfile} className="px-6 py-2 bg-emerald-600 text-white rounded-md">
            Save Changes
          </button>
          <button onClick={deleteAccount} className="px-6 py-2 bg-red-600 text-white rounded-md">
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;

/* ===== UI HELPERS ===== */

const Input = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-2 border rounded-md"
    />
  </div>
);

const Select = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md"
    >
      <option value="">Select</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full px-4 py-2 border rounded-md"
    />
  </div>
);
