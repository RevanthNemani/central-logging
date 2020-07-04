/**
 * Project: central-logging
 * Description: Central logging system for all requests to alizz islamic bank middleware.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const Log = require('../models/log');

exports.postLog = (req, res, next) => {
  const request = req.body;
  const log = new Log({ _id: request.auth.uuid, request: request });
  log
    .save()
    .then(() => res.status(201).json({ success: 1 }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: 0, reason: err });
    });
};

exports.patchLog = (req, res, next) => {
  const response = req.body;
  Log.findById({ _id: response.auth.uuid })
    .then((log) => {
      log.response = response;
      return log.save();
    })
    .then(() => {
      res.status(201).json({ success: 1 });
    })
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err });
    });
};
