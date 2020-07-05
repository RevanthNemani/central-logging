
# cd /home/node/
# wget -O central-logging.tar.gz 'https://github.com/RevanthNemani/central-logging/archive/v0.8.0.tar.gz'
# tar -xzf central-logging.tar.gz

sudo echo '
########################################################################
## Project: central-logging                                           ##
## Description: Central logging system for all                        ##
##              requests to alizz islamic bank middleware.            ##
## Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.        ##
## Author: Revanth Nemani <revanth.nemani@alizzislamic.com>           ##
########################################################################
#
# Node environment variable. Options: [development | test | production]
NODE_ENV=production
# Enable it only when needed. Not advisable in production scenario.
# WARNING: This will recreate all tables. You will lose your data.
#RECREATE_DB=1
#
# Development Environment Variables
#
# Development Database setup
DEV_DB_USERNAME=alizz-logs
DEV_DB_PASSWORD=Alizz2020
DEV_DB_DATABASE=central_logs
DEV_DB_HOST=10.10.150.71
DEV_DB_PORT=27017
# Development server setup
DEV_APP_HOST=10.10.150.42
DEV_APP_PORT=5143
# Devlopment Reverse proxy information
DEV_SERVER_TYPE=http
DEV_SERVER_NAME=10.10.150.42
DEV_PROXY_PORT=5143
# Development x-api-key required for admin operations
DEV_SECRET_KEY=
#
# Test Environment Variables
#
# Test Database setup
TEST_DB_USERNAME=alizz-logs
TEST_DB_PASSWORD=Alizz2020
TEST_DB_DATABASE=central_logs
TEST_DB_HOST=10.10.150.71
TEST_DB_PORT=27017
# Test server setup
TEST_APP_HOST=10.10.150.42
TEST_APP_PORT=5143
# Test Reverse proxy information
TEST_SERVER_TYPE=http
TEST_SERVER_NAME=10.10.150.42
TEST_PROXY_PORT=5143
# Test x-api-key required for admin operations
TEST_SECRET_KEY=
#
# Production Environment Variables
#
# Production Database setup
PROD_DB_USERNAME=alizz-logs
PROD_DB_PASSWORD=Alizz2020
PROD_DB_DATABASE=central_logs
PROD_DB_HOST=10.10.150.71
PROD_DB_PORT=27017
# Production server setup
PROD_APP_HOST=10.10.150.42
PROD_APP_PORT=5143
# Production Reverse proxy information
PROD_SERVER_TYPE=http
PROD_SERVER_NAME=10.10.150.42
PROD_PROXY_PORT=5143
# Production x-api-key required for admin operations
PROD_SECRET_KEY=

' > ./.env

cd ./

npm install

/usr/bin/node

sudo echo '
[Unit]
Description=Central logging system for all requests to alizz islamic bank middleware.
Documentation=https://gitlab.com/it/node/central-logging
After=network.target

[Service]
WorkingDirectory=/home/node/central-logging-0.8.0
User=node
ExecStart=/usr/bin/node server.js
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target

' > /lib/systemd/system/central-logging.service

sudo systemctl daemon-reload

sudo systemctl start central-logging

