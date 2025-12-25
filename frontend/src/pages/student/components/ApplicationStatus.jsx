import { useEffect, useState } from "react";
import API from "../../../services/api";

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await API.get("/student/applications");
      setApplications(res.data);
    };
    fetchStatus();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Application Status</h2>

      {applications.map((a) => (
        <div key={a._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between mb-3">
          <span>{a.internship.title}</span>
          <span className="font-medium text-emerald-600">{a.status}</span>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatus;
