/**
 * Project: central-logging
 * Description: Central logging system for all requests to alizz islamic bank middleware.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com> Saqer AlBadi <saqer.albadi@alizzislamic.com>
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    _id: { type: String, primaryKey: true, allowNull: false },
    request: { type: Object, required: true },
    middleware: [{ type: Object, required: false }],
    response: { type: Object, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Log', LogSchema);
