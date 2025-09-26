import { useEffect, useState } from "react";
import api from "../services/api";
import { Form, Button } from "react-bootstrap";

export default function Postjob() {
  

  return (
    <div>
      <h2 className="mb-4">Jobs List</h2>
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
