/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app');
const Patient = require('../../models/patient.model');

describe('api/patients', () => {
  beforeEach(async () => {
    await Patient.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all patients', async () => {
      const patients = [
        { name: 'patient1' },
        { name: 'patient2' },
      ];
      await Patient.insertMany(patients);
      console.log(patients);
      const res = await request(app).get('/api/patients');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(patients.length);
    });
  });

  describe('GET /:id', () => {
    it('should return a patient if valid id is passed', async () => {
      const patient = new Patient({ name: 'patient1' });
      await patient.save();
      const res = await request(app).get(`/api/patients/${patient._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', patient.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await request(app).get('/api/patients/1');
      expect(res.status).to.equal(400);
    });

    it('should return 404 error when valid object id is passed but does not exist', async () => {
      const res = await request(app).get('/api/patients/111111111111');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /', () => {
    it('should return patient when the request body is valid', async () => {
      const patient = { name: 'patient1' };
      const res = await request(app)
        .post('/api/patients')
        .send(patient);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name', patient.name);
    });

    // TODO add a test posting an empty patient object
  });

  describe('PUT /:id', () => {
    it('should update the existing patient and return 200', async () => {
      const patient = new Patient({ name: 'patient1' });
      await patient.save();

      const updatedPatient = { name: 'updatedPatient' };
      const res = await request(app)
        .put(`/api/patients/${patient._id}`)
        .send(updatedPatient);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', updatedPatient.name);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const patient = new Patient({ name: 'patient1' });
      await patient.save();

      const res = await request(app).delete(`/api/patients/${patient._id}`);
      expect(res.status).to.be.equal(200);
    });

    it('should return 404 when deleted patient is requested', async () => {
      const patient = new Patient({ name: 'patient1' });
      await patient.save();

      let res = await request(app).delete(`/api/patients/${patient._id}`);
      expect(res.status).to.be.equal(200);

      res = await request(app).get(`/api/patients/${patient._id}`);
      expect(res.status).to.be.equal(404);
    });
  });
});
