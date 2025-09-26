import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get("http://localhost:5000/company/list");
        //console.log(res.data.company);
        setCompany(res.data);
      } catch {
        setCompany([]);
      }
    };
    fetchCompany();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Company List</h2>
      {company.length === 0 ? ('No companies available.') : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Company Title</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {company.map((comp) => (
              <tr key={comp.id}>
                <td>{comp.id}</td>
                <td>{comp.title}</td>
                <td>{comp.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
