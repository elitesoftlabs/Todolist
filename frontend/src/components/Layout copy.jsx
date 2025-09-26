import { Link, Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Card } from "react-bootstrap";
import api from "../services/api";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div>
        <Container className="w-100 flex-grow-1 py-4 bg-light my-full-width">
          <Row className="g-4 pr-0 mr-0">
            {/* Main Content */}
            <Col md={12}>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <Link className="navbar-brand" to="/dashboard">MyApp</Link>
                  <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                      </li>
                    </ul>
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </nav>
          </Col>
          </Row>
          {/* Main body */}
          <Row className="g-4 pr-0 mr-0">
            {/* Main Content */}
            <Col md={10}>
              <Card className="h-100 shadow-sm p-0">
                <Card.Body>
                  <Card.Text className="bg-light">                    
                    <div className="container mt-4">
                      <Outlet />
                    </div>                   
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    </div>
  );
}