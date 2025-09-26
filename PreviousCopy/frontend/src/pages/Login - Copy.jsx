import { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      window.location.href = "/";
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Login</h4>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Username"
            value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" className="form-control mb-2" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
