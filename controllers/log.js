/**
 * Project: central-logging
 * Description: Central logging system for all requests to alizz islamic bank middleware.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com> Saqer AlBadi <saqer.albadi@alizzislamic.com>
 */

const Log = require('../models/log');

// POST create logs with request and id
exports.postLog = (req, res, next) => {
  const request = req.body;
  const log = new Log({
    _id: request.auth.uuid,
    request: request,
    response: null,
  });
  log
    .save()
    .then(() => res.status(201).json(request))
    .catch((err) => {
      if (err.code == 11000) {
        res.status(400).json({
          success: 0,
          reason: {
            errorCode: '7',
            errorDesc: 'DuplicatedGUID',
          },
        });
      } else {
        res.status(400).json({
          success: 0,
          reason: {
            errorCode: '128',
            errorDesc: 'NoGUID or other errors',
          },
        });
      }
    });
};

// PATCH update logs with the response for the same request using the same id
exports.patchLog = (req, res, next) => {
  const response = req.body;
  Log.findById(response.auth.uuid)
    .then((log) => {
      if (log.response == null) {
        log.response = response;
        return log.save();
      }
      throw new Error(`response already exists, can't overwrite a response`);
    })
    .then(() => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};

// PATCH update logs with middleware responses for the same request using the same id
exports.patchMiddlewareLog = (req, res, next) => {
  const middlewareReqRes = req.body;
  Log.findByIdAndUpdate(middlewareReqRes.auth.uuid, {
    $push: {
      middleware: middlewareReqRes
    }
  })
    .then(() => {
      res.status(201).json(middlewareReqRes);
    })
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};


// GET particular log using _id
exports.getLog = (req, res, next) => {
  Log.findById(req.params.logId)
    .then((log) => {
      res.status(200).json(log);
    })
    .catch((err) => {
      res.status(404).json({ error: 'notFound' });
    });
};
