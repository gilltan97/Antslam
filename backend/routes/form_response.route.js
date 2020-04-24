const express = require('express');
const mongoose = require('mongoose');

const FormResponse = require('../models/form_response.model');

const formResponseRouter = express.Router();

formResponseRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const formResponses = await FormResponse.find(req.query)
        .populate('clinician')
        .populate('patient');
      res.status(200).contentType('application/json').json(formResponses);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body);
      const formResponse = await FormResponse.create(req.body);
      res.status(200).contentType('application/json').json(formResponse);
    } catch (err) {
      next(err);
    }
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /form-responses');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /form-responses');
  });

formResponseRouter.route('/:formResponseId')
  .get(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.formResponseId)) {
      return res.status(400).send('Invalid object id');
    }
    try {
      const formResponse = await FormResponse.findById(req.params.formResponseId);
      if (!formResponse) {
        return res.status(404).send('FormResponse not found');
      }
      return res.status(200).contentType('application/json').json(formResponse);
    } catch (err) {
      return next(err);
    }
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /form-responses/${req.params.formResponseId}`);
  })
  .put(async (req, res, next) => {
    try {
      const formResponse = await FormResponse.findByIdAndUpdate(req.params.formResponseId, {
        $set: req.body,
      }, { new: true });
      if (!formResponse) {
        return res.status(404).send('FormResponse not found');
      }
      return res.status(200).contentType('application/json').json(formResponse);
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const formResponse = await FormResponse.findByIdAndRemove(req.params.formResponseId);
      if (!formResponse) {
        return res.status(404).send('FormResponse not found');
      }
      return res.status(200).contentType('application/json').json(formResponse);
    } catch (err) {
      return next(err);
    }
  });

module.exports = formResponseRouter;
