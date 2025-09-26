import { Container, Row, Col, Navbar, Nav, Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function LeftPanel() {
  return (

        <Card className="shadow-sm h-100 p-0">
        <Card.Body className="p-0 border rounded-3 overflow-hidden">
            {/* Job Module */}
            <h6 className="header-bg text-white p-2 mb-0">Job Module</h6>
            <ListGroup variant="flush">
            <ListGroup.Item action as={Link} to="/dashboard">
                All Companies
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/jobs/list">
                All Jobs
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/jobs/postjob">
                Post a New Job
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/jobseeker/list">
                List Job Seekers
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/apply/list">
                List Applications
            </ListGroup.Item>
            </ListGroup>
        </Card.Body>
        </Card>
        );
}

export default LeftPanel;