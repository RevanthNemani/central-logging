/**
 * Project: central-logging
 * Description: Central logging system for all requests to alizz islamic bank middleware.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>, Saqer AlBadi <saqer.albadi@alizzislamic.com>
 */

const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');

// POST log request
router.post('/logs', logController.postLog);

// PATCH log response
router.patch('/logs', logController.patchLog);

// PATCH log middleware responses
router.patch('/middleware/logs', logController.patchMiddlewareLog);

// GET one log
router.get('/logs/:logId', logController.getLog);

module.exports = router;
