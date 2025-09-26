import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Card } from "react-bootstrap";
import api from "../services/api";
const baseUrl = "http://localhost:5000/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:5000/auth/login", { username, password });
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
  <Container className="flex-grow-1 py-4 bg-light my-full-width">
    <Row className="g-4 pr-0 mr-0">
      <Col md={12}>
          <h3 className="text-center mb-3">Login</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">Login</button>
          </form>
      </Col>
    </Row>
  </Container>
  );
}
