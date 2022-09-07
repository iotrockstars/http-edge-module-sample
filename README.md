# BNSF Demo

## HTTP Module

This module allows you to inject any json to this module through http post.

```bash
curl -d '{"temp":55.6, "hum":12.5}' -H "Content-Type: application/json" -X POST http://localhost:9000
```

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

​    'temp':81,

​    'hum':67.4

}
```



![image-20220907112451472](/assets/images/image-20220907112451472.png)

