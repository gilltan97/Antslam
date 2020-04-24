/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { useState, useEffect } from 'react';
import {
  Form, Button, Row, Col, ListGroup, ListGroupItem,
} from 'react-bootstrap';

import { getPatients, createPatient } from '../../services/patients';

const style = {
  label: {
    color: '#7f7f7f',
  },

  listItem: {
    paddingBottom: '0',
    fontSize: '.875rem',
    fontFamily: '"Avenir Next","Lucida Grande"',
  },

  id: {
    color: '#007bff',
    marginLeft: '20px',
  },
};

export function validateObjectId(value) {
  const bytes = new Blob([value]).size;
  return bytes / 2 === 12;
}

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [id, setId] = useState(undefined);
  const [idValid, setIdValid] = useState(true);
  const [name, setName] = useState('');

  async function loadPatients(query) {
    const result = await getPatients(query);
    setPatients(result);
  }

  useEffect(() => {
    loadPatients();
  }, []);

  function onChange(e) {
    const { value } = e.target;

    if (value === '') {
      setId(undefined);
      setIdValid(true);
      return;
    }

    setIdValid(validateObjectId(value));
    setId(value);
  }

  function onChangeForNewPatientName(e) {
    const { value } = e.target;
    setName(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (idValid) {
      const query = {
        _id: id,
      };

      loadPatients(query);
    }
  }

  async function handleAddPatient(event) {
    event.preventDefault();
    if (name !== '') {
      const query = {
        name,
      };

      await createPatient(query);
      await loadPatients({});
    } else {
      alert('Please enter a valid name!');
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="patientId">
                  <Form.Label style={style.label}><strong>Patient ID</strong></Form.Label>
                  <Row>
                    <Col>
                      <Form.Control size="sm" type="text" placeholder="Enter the patient's ID" style={{ borderColor: idValid ? 'gray' : 'red' }} onChange={(e) => onChange(e)} />
                    </Col>
                    <Col>
                      <Button size="sm" variant="outline-primary" type="submit">
                      Search
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup>
                  {patients.map((patient) => (
                    <ListGroupItem style={style.listItem} key={patient._id}>
                      <p>
                        <strong>{patient.name}</strong>
                        <i style={style.id}>{patient._id}</i>
                      </p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col />
            </Row>
          </Form>
        </div>
        <div className="col-5">
          <Form onSubmit={handleAddPatient}>
            <Row>
              <Col>
                <Form.Group controlId="newPatientId">
                  <Form.Label style={style.label}><strong>Add New Patient</strong></Form.Label>
                  <Row>
                    <Col>
                      <Form.Control size="sm" type="text" placeholder="Enter the patient's name" style={{ borderColor: 'gray' }} onChange={(e) => onChangeForNewPatientName(e)} />
                    </Col>
                    <Col>
                      <Button size="sm" variant="outline-primary" type="submit">
                        Create
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PatientPage;
