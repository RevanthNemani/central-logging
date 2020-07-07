# Central logging

>Description: Central logging system for all requests to alizz islamic bank middleware.
>
>Copyright © 2020 alizz islamic Bank. All Rights Reserved.
>
>Author: Revanth Nemani <revanth.nemani@alizzislamic.com>

## Introduction

// TODO: Introduction

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

### Uninstall

```{sh}
cd /home/node/

sh uninstall.sh
```

## Administration

// TODO: Configuring environment variables

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
