/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app');
const Clinician = require('../../models/clinician.model');

const BASE_URL = '/api/clinicians';

describe(BASE_URL, () => {
  beforeEach(async () => {
    await Clinician.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all clinicians', async () => {
      const clinicians = [
        { name: 'clinician1' },
        { name: 'clinician2' },
      ];
      await Clinician.insertMany(clinicians);
      console.log(clinicians);
      const res = await request(app).get(BASE_URL);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(clinicians.length);
    });
  });

  describe('GET /:id', () => {
    it('should return a clinician if valid id is passed', async () => {
      const clinician = new Clinician({ name: 'clinician1' });
      await clinician.save();
      const res = await request(app).get(`${BASE_URL}/${clinician._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', clinician.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await request(app).get(`${BASE_URL}/1`);
      expect(res.status).to.equal(400);
    });

    it('should return 404 error when valid object id is passed but does not exist', async () => {
      const res = await request(app).get(`${BASE_URL}/111111111111`);
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /', () => {
    it('should return clinician when the request body is valid', async () => {
      const clinician = { name: 'clinician1' };
      const res = await request(app)
        .post(BASE_URL)
        .send(clinician);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name', clinician.name);
    });

    // TODO add a test posting an empty clinician object
  });

  describe('PUT /:id', () => {
    it('should update the existing clinician and return 200', async () => {
      const clinician = new Clinician({ name: 'clinician1' });
      await clinician.save();

      const updatedClinician = { name: 'updatedClinician' };
      const res = await request(app)
        .put(`${BASE_URL}/${clinician._id}`)
        .send(updatedClinician);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', updatedClinician.name);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const clinician = new Clinician({ name: 'clinician1' });
      await clinician.save();

      const res = await request(app).delete(`${BASE_URL}/${clinician._id}`);
      expect(res.status).to.be.equal(200);
    });

    it('should return 404 when deleted clinician is requested', async () => {
      const clinician = new Clinician({ name: 'clinician1' });
      await clinician.save();

      let res = await request(app).delete(`${BASE_URL}/${clinician._id}`);
      expect(res.status).to.be.equal(200);

      res = await request(app).get(`${BASE_URL}/${clinician._id}`);
      expect(res.status).to.be.equal(404);
    });
  });
});
