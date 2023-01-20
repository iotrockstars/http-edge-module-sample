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

## If you are working with EFLOW

If you want to connect to the port directly from the Windows host OS, you can use the EFLOW VM IP address + the port. To get the EFLOW VM IP, you can use the ```Get-EflowVmAddr```.

If you want to connect from a different Windows device, there are two possible scenarios:

Internal Switch with Win Server - you can use Static IP instead of DHCP and then use port forwarding to that static IP. For example, imagine your EFLOW VM has the 172.20.1.2 address, and you want to forward the port 8080, then on the Windows host OS you should run the following command: 
```bash
netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=8080 connectaddress=172.20.1.2
```

Default Switch with Win Client- you can use the EFLOW VM hostname + "mshome.net" instead of the static IP. For example, imagine your EFLOW VM has the "DESKTOP-TEST-EFLOW" hostname, and you want to forward the port 8080, then on the Windows host OS you should run the following command: 
```bash
netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=8080 connectaddress=DESKTOP-TEST-EFLOW.mshome.net
```
For more information 

[Azure IoT Edge for Linux on Windows virtual switch creation](https://learn.microsoft.com/en-us/azure/iot-edge/how-to-create-virtual-switch?view=iotedge-1.4)

[Networking configuration for Azure IoT Edge for Linux on Windows](https://learn.microsoft.com/en-us/azure/iot-edge/how-to-configure-iot-edge-for-linux-on-windows-networking?view=iotedge-1.4)
