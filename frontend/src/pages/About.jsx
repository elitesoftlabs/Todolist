import { Table } from "react-bootstrap";

function About() {
  return (
    <div className="m-2">
      <h2 className="mb-4">About Us</h2>
      <p>
        We are a software company focused on delivering AI & Web solutions. Our mission
        is to provide cutting-edge technology with simplicity.
      </p>

      <h4 className="mt-4">Our Team</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Alice</td>
            <td>Project Manager</td>
            <td>8 years</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Bob</td>
            <td>Developer</td>
            <td>5 years</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Charlie</td>
            <td>Designer</td>
            <td>4 years</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default About;
