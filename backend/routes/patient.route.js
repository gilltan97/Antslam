const express = require('express');
const mongoose = require('mongoose');

const Patient = require('../models/patient.model');

const patientRouter = express.Router();

patientRouter.route('/')
  .get((req, res, next) => {
    Patient.find(req.query)
      .then((patients) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(patients);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Patient.create(req.body)
      .then((patient) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(patient);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /patients');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /patients');
  });

patientRouter.route('/:patientId')
  .get((req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.patientId)) {
      return res.status(400).send('Invalid object id');
    }
    return Patient.findById(req.params.patientId)
      .then((patient) => {
        if (!patient) {
          return res.status(404).send('Patient not found');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(patient);
        return res;
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /patients/${req.params.patientId}`);
  })
  .put((req, res, next) => {
    Patient.findByIdAndUpdate(req.params.patientId, {
      $set: req.body,
    }, { new: true })
      .then((patient) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(patient);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Patient.findByIdAndRemove(req.params.patientId)
      .then((patient) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(patient);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = patientRouter;
