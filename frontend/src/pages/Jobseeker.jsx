import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jobseeker() {
  const [jobseekers, setJobseekers] = useState([]);

  useEffect(() => {
    const fetchJobseekers = async () => {
      try {
        const res = await api.get("http://localhost:5000/jobseeker/list");
          setJobseekers(res.data);
      } catch {
        setJobseekers([]);
      }
    };
    fetchJobseekers();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Jobseeker List</h2>
      {jobseekers.length === 0 ? ('No jobseekers available.') : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Jobseeker Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {jobseekers.map((jobseeker) => (
              <tr key={jobseeker.id}>
                <td>{jobseeker.id}</td>
                <td>{jobseeker.name}</td>
                <td>{jobseeker.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
