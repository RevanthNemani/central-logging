/**
 * Project: central-logging
 * Description: Central logging system for all requests to alizz islamic bank middleware.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');

const router = express.Router();

const logController = require('../controllers/log');

// POST logs
router.post('/logs', logController.postLog);

//PATCH
router.patch('/logs', logController.patchLog);

module.exports = router;
