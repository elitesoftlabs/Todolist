import { Link, Outlet } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Card } from "react-bootstrap";

import api from "../services/api";
import Header from "./Header";
import Footer from "./Footer";
import LeftPanel from "./LeftPanel";

export default function Layout() {  

  return (
    <div className="fixed-top">
        <Container className="w-100 flex-grow-1 py-4 bg-light my-full-width">
          <Row className="g-4 pr-0 mr-0">
            <Header />
            {/* Main Content */}
          </Row>
          {/* Main body */}
          <Row className="g-4 pr-0 mr-0 mt-1">
            <Col md={2}>
              <LeftPanel />
            </Col>
            {/* Main Content */}
            <Col md={10}>
              <nav className="navbar navbar-expand-lg navbar-dark header-bg">
                <div className="container-fluid">
                  <Link className="navbar-brand text-white font-weight-bold" to="/dashboard">MyApp</Link>
                </div>
              </nav>
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
          <Row className="g-4 pr-0 mr-0 fixed-bottom">
            <Footer />
          </Row>
        </Container>
    </div>
  );
}