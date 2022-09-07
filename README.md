# HTTP Edge Module Sample

## Overview

This is an example of how to create a module for IoT Edge that receives a message via an HTTP post, the module will receive it and convert it to a message to send upstream.

## HTTP Module

### Configuration

Container Create Options

```json
{
    "HostConfig": {
        "PortBindings": {
            "9000/tcp": [
                {
                    "HostPort": "9000"
                }
            ]
        }
    }
}
```

### Sending a message

This module allows you to inject any json to this module through http post.

```bash
curl -d '{"temp":55.6, "hum":12.5}' -H "Content-Type: application/json" -X POST http://localhost:9000
```

### Using Postman

Also we can use Postman to test the module

POST

Headers

| KEY          | VALUE            |
| ------------ | ---------------- |
| Content-Type | application/json |



Body

Select Raw and Json

```json
{
​    "temp":81,
​    "hum":67.4
}
```



![image-20220907112451472](/assets/images/image-20220907112451472.png)

