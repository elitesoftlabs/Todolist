import { Container, Row, Col, Navbar, Nav, Card } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/custom.css'
import Header from "./Header";
import Footer from "./Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";


function Homepage() {
  return (
    <Router className="p-2">
    <div className="d-flex flex-column min-vh-100">
      {/* ===== Header ===== */}

          <Header />

        {/* ===== Body ===== */}
        <Container className="w-100 flex-grow-1 py-4 bg-light my-full-width">
          <Row className="g-4 pr-0 mr-0">
            {/* Left Panel */}      
  

            {/* Main Content */}
            <Col md={10}>
              <Card className="h-100 shadow-sm p-0">
                <Card.Body>
                  <Card.Text className="bg-light">                    
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ===== Footer ===== */}
        <Footer />

    </div>
    </Router>
  );
}

export default Homepage;
