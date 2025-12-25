import { useEffect, useState } from "react";
import API from "../../../services/api";

const MentorDetails = () => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await API.get("/student/mentor");
      setMentor(res.data);
    };
    fetchMentor();
  }, []);

  if (!mentor) return <p>Loading mentor...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Mentor Details</h2>
      <p>Name: {mentor.name}</p>
      <p>Email: {mentor.email}</p>
      <p>Expertise: {mentor.expertise}</p>
    </div>
  );
};

export default MentorDetails;
