/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React, { useState, useEffect } from 'react';
import {
  Form, Button, Row, Col, ListGroup, ListGroupItem,
} from 'react-bootstrap';

import { getClinicians } from '../../services/clinicians';

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

function ClinicianPage() {
  const [clinicians, setClinicians] = useState([]);
  const [id, setId] = useState(undefined);
  const [idValid, setIdValid] = useState(true);

  async function loadClinicians(query) {
    if (query._id) {
      const result = clinicians.filter((clinician) => clinician._id === query._id);
      setClinicians(result);
    } else {
      const result = await getClinicians(query);
      setClinicians(result);
    }
  }

  useEffect(() => {
    loadClinicians({});
    // eslint-disable-next-line
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

  function handleSubmit(event) {
    event.preventDefault();

    console.log('submitted');

    if (idValid) {
      const query = {
        _id: id,
      };

      loadClinicians(query);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="clinicianId">
                  <Form.Label style={style.label}><strong>Clinician ID</strong></Form.Label>
                  <Row>
                    <Col>
                      <Form.Control size="sm" type="text" placeholder="Enter the clinician id" style={{ borderColor: idValid ? 'black' : 'red' }} onChange={(e) => onChange(e)} />
                    </Col>
                    <Col>
                      <Button size="sm" variant="secondary" type="submit">
                      Find clinician
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup>
                  {clinicians.map((clinician) => (
                    <ListGroupItem style={style.listItem} key={clinician._id}>
                      <p>
                        <strong>{clinician.name}</strong>
                        <i style={style.id}>{clinician._id}</i>
                      </p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col />
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ClinicianPage;
