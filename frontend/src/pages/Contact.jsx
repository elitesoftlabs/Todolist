import { Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <div className="m-3">
      <h2 className="mb-4">Contact Us</h2>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Write your message..." />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Contact;