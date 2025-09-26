import { Container, Row, Col, Navbar, Nav, Card, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Header() {
  const navigate = useNavigate();
    const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };
  return (
    <Navbar className="header-bg" variant="dark" expand="lg">
        <Container fluid className="w-100 my-full-width">
          <Navbar.Brand href="#">
            Elite Soft Labs - Job Portal   
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
              <Nav className="ms-auto nav-font-color">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Button variant="light" onClick={handleLogout}>Logout</Button>
              </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Header;