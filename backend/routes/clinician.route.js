const express = require('express');
const mongoose = require('mongoose');

const Clinician = require('../models/clinician.model');

const clinicianRouter = express.Router();

clinicianRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const clinicians = await Clinician.find(req.query);
      res.status(200).contentType('application/json').json(clinicians);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const clinician = await Clinician.create(req.body);
      res.status(200).contentType('application/json').json(clinician);
    } catch (err) {
      next(err);
    }
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /clinicians');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /clinicians');
  });

clinicianRouter.route('/:clinicianId')
  .get(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.clinicianId)) {
      return res.status(400).send('Invalid object id');
    }
    try {
      const clinician = await Clinician.findById(req.params.clinicianId);
      if (!clinician) {
        return res.status(404).send('Clinician not found');
      }
      res.status(200).contentType('application/json').json(clinician);
      return res;
    } catch (err) {
      return next(err);
    }
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /clinicians/${req.params.clinicianId}`);
  })
  .put(async (req, res, next) => {
    try {
      const clinician = await Clinician.findByIdAndUpdate(req.params.clinicianId, {
        $set: req.body,
      }, { new: true });
      if (!clinician) {
        return res.status(404).send('Clinician not found');
      }
      res.status(200).contentType('application/json').json(clinician);
      return res;
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const clinician = await Clinician.findByIdAndRemove(req.params.clinicianId);
      if (!clinician) {
        return res.status(404).send('Clinician not found');
      }
      res.status(200).contentType('application/json').json(clinician);
      return res;
    } catch (err) {
      return next(err);
    }
  });

module.exports = clinicianRouter;
