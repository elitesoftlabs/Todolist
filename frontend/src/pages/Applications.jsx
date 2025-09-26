import { useEffect, useState } from "react";
import api from "../services/api";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("http://localhost:5000/apply/list");
          setApplications(res.data);
      } catch {
        setApplications([]);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Applications List</h2>
      {applications.length === 0 ? ('No applications available.') : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Application Title</th>
              <th>Application Level</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.Job_Title}</td>
                <td>{application.Experience_Level}</td>
                <td>{application.Job_Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
