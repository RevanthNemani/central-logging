# Central logging

>Description: Central logging system for all requests to alizz islamic bank middleware.
>
>Copyright © 2020 alizz islamic Bank. All Rights Reserved.
>
>Author: Revanth Nemani <revanth.nemani@alizzislamic.com>

- [Central logging](#central-logging)
  - [Introduction](#introduction)
  - [Install and Uninstall](#install-and-uninstall)
    - [Install](#install)
    - [Uninstall](#uninstall)
  - [Administration](#administration)
    - [Start, stop and restart](#start-stop-and-restart)
    - [MongoDB connection and other environment variables](#mongodb-connection-and-other-environment-variables)
  - [REST Services](#rest-services)
    - [GET Services](#get-services)
    - [POST Services](#post-services)
    - [PATCH Services](#patch-services)

## Introduction

The central logging system for alizz islamic bank is a service to log all incoming requests and their corresponding outgoing responses to/from the middleware.

## Install and Uninstall

### Install

>Install in node user home:

Get the package

```{sh}
cd /home/node/

wget -O central-logging.tar.gz 'http://10.10.103.3:8080/it/node/central-logging/-/archive/v0.9.0/cental-logging-v0.9.0.tar.gz'

tar -xzf central-logging.tar.gz
```

Go into the newly extracted package and run the install script.

*Edit the install script to suite your requirement.*

```{sh}
cd /cental-logging-v0.9.0

sh install.sh
```

<CENTRAL_LOGGING_HOME> is reference to the install location. In this case `/home/node/central-logging-v0.9.0`

### Uninstall

```{sh}
cd /home/node/

sh uninstall.sh
```

## Administration

### Start, stop and restart

This service once installed uses systemd. The service name is central-logging.service and can be used with `systemctl` commands.

To restart the service:

`systemctl restart central-logging`

To stop the service:

By default stopping will restart the service. In case you need to entirely stop the service without it auto restarting, edit the service file `/lib/systemd/system/central-logging.service`. In the service section find `Restart=always` and change it to `Restart=on-failure`. reload the system daemon: `sudo systemctl daemon-reload`. Run the below command to stop the service. 

`systemctl stop central-logging`

In case you've changed the restart option either in the install script or after installation, you might need to start the service manually with the following command:

`systemctl start central-logging`

By default the install script will enable the service to run after startup of the server. To disable this: `systemctl disable central-logging`

To re-enable it: `systemctl enable central-logging`

### MongoDB connection and other environment variables

The environment variables can be set/found in the .env file in <CENTRAL_LOGGING_HOME>

The environment variable can be divided into 3 categories:

1. Development
2. Test
3. Production

Based on the value you set for NODE_ENV the service will pickup the relevent environment variables. 

NODE_ENV can be set to `development`, `test` or `production`. For production scenario, always use `production`.

Following table will explain the rest of the environment variables:

| development environment variable | test environment variable | prod environment variable | Description                                                                                                               |
| -------------------------------- | ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| DEV_DB_USERNAME                  | TEST_DB_USERNAME          | PROD_DB_USERNAME          | MongoDB username to connect with                                                                                          |
| DEV_DB_PASSWORD                  | TEST_DB_PASSWORD          | PROD_DB_PASSWORD          | MongoDB password to connect with                                                                                          |
| DEV_DB_DATABASE_AUTH             | TEST_DB_DATABASE_AUTH     | PROD_DB_DATABASE_AUTH     | MongoDB authentication database                                                                                           |
| DEV_DB_DATABASE                  | TEST_DB_DATABASE          | PROD_DB_DATABASE          | MongoDB database to store logs                                                                                            |
| DEV_DB_HOST                      | TEST_DB_HOST              | PROD_DB_HOST              | MongoDB Hostname/IP                                                                                                       |
| DEV_DB_PORT                      | TEST_DB_PORT              | PROD_DB_PORT              | MongoDB Port                                                                                                              |
| DEV_APP_HOST                     | TEST_APP_HOST             | PROD_APP_HOST             | The hostname/IP of the server where the service is deployed                                                               |
| DEV_APP_PORT                     | TEST_APP_PORT             | PROD_APP_PORT             | The port of the server where the service is deployed. Default is 5143                                                     |
| DEV_SERVER_TYPE                  | TEST_SERVER_TYPE          | PROD_SERVER_TYPE          | Is the reverse proxy address type 'http' or 'https'? default is http                                                      |
| DEV_SERVER_NAME                  | TEST_SERVER_NAME          | PROD_SERVER_NAME          | The hostname/IP of the reverse proxy                                                                                      |
| DEV_PROXY_PORT                   | TEST_PROXY_PORT           | PROD_PROXY_PORT           | The host port of the reverse proxy                                                                                        |
| DEV_SECRET_KEY                   | TEST_SECRET_KEY           | PROD_SECRET_KEY           | For accessing admin APIs. currently no API is using this. This can be omitted for now and may be used in future releases. |

After setting the environment variables to suite your needs restart the service. These can be set in the install script prior to installation.

## REST Services

This system natively supports json data, just follow the example requests/responses below.

For xml, text or other kind of requests:

Send the incoming request/ outgoing response as text as part of request/response object. Please do not forget to escape the quotes(" as \\").

Example:

```{json}
{
  "auth": {
    "uuid": "{{UUID4}}"
  },
  "request": "<root xlmns=\"http://example.org\"><auth><channelId>DBSYS</channelId><dateTime>2020-07-07T12:30:56</dateTime><msgType>0200</msgType><supervisoryId>DBSYSUSR</supervisoryId><terminalId>MB</terminalId><tranCode>0023</tranCode><uuid>2942f904-e8ca-410c-8a7c-17865bcff9b6</uuid></auth><request><billerCode>3</billerCode><consumerNo>35327</consumerNo><serviceType>Electricity</serviceType></request></root>"
}
```

### GET Services

Headers

```{curl}
Accept:application/json
```

>Request 1: Get the request and response logged by
>the central logging system using UUID4 passed in 
>the request/response

`http://10.10.150.42:5143/logs/{{UUID4 used in the request}}`

### POST Services

Headers

```{curl}
Content-Type:application/json
Accept:application/json
```

>Request 1: insert incoming request to mongoDB

`http://10.10.150.42:5143/logs`

Example request

```{json}
{
  "auth": {
    "uuid": "{{UUID4}}"
  },
  "request": {
  }
}
```

Example Success response

```{json}
{
    "auth": {
        "uuid": "{{UUID4}}"
    },
    "request": {}
}
```

Example error response

```{json}
{
    "success": 0,
    "reason": {
        "errorCode": "7",
        "errorDesc": "DuplicatedGUID"
    }
}
```

### PATCH Services

Headers

```{curl}
Content-Type:application/json
Accept:application/json
```

>Request 1: insert outgoing response to mongoDB

`http://10.10.150.42:5143/logs`

Example request

```{json}
{
  "auth": {
    "uuid": "{{Same UUID4 used in request}}"
  },
  "response": {
  }
}
```

Example Success response

```{json}
{
    "auth": {
        "uuid": "{{UUID4}}"
    },
    "request": {}
}
```

Example error response

```{json}
{
    "success": 0,
    "reason": {
        "errorCode": "128",
        "errorDesc": "Cannot overwrite already existing response"
    }
}
```
