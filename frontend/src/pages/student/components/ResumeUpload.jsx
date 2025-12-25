import { useState } from "react";

const ResumeUpload = ({ setActive }) => {
  const [file, setFile] = useState(null);

  const upload = () => {
    alert("Resume uploaded. Matching internships...");
    setActive("internships");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={upload}
        className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-md"
      >
        Upload & Match
      </button>
    </div>
  );
};

export default ResumeUpload;
