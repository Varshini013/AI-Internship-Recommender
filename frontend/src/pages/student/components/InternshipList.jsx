import { useEffect, useState } from "react";
import API from "../../../services/api";

const InternshipList = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      const res = await API.get("/student/matched-internships");
      setInternships(res.data);
    };
    fetchInternships();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Matched Internships</h2>

      {internships.map((i) => (
        <div key={i._id} className="bg-white p-6 rounded-xl shadow-sm mb-4">
          <h3 className="font-semibold">{i.title}</h3>
          <p>{i.company}</p>
          <p className="text-sm text-slate-500">{i.location}</p>
        </div>
      ))}
    </div>
  );
};

export default InternshipList;
