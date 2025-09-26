import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("http://localhost:5000/jobs/list");
          setJobs(res.data);
      } catch {
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Jobs List</h2>
      {jobs.length === 0 ? ('No jobs available.') : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Experience Level</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.Job_Title}</td>
                <td>{job.Experience_Level}</td>
                <td>{job.Job_Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
