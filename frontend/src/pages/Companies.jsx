import { useEffect, useState } from "react";
import api from "../services/api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("http://localhost:5000/company/list");
        //console.log(res.data.company);
        setCompanies(res.data);
      } catch {
        setCompanies([]);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Company List</h2>
      {companies.length === 0 ? ('No companies available.') : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Company Title</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((comp) => (
              <tr key={comp.id}>
                <td>{comp.id}</td>
                <td>{comp.Company_Name}</td>
                <td>{comp.Company_Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
