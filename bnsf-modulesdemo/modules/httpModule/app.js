'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
const express = require('express');
const app = express();
app.use(express.json());

let globalClient=null;
Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');
        globalClient=client;
        // Act on input messages to the module.
        client.on('inputMessage', function (inputName, msg) {
          pipeMessage(client, inputName, msg);
        });
      }
    });
  }
});

// This function just pipes the messages without any change.
function pipeMessage(client, inputName, msg) {
  client.complete(msg, printResultFor('Receiving message'));

  if (inputName === 'input1') {
    var message = msg.getBytes().toString('utf8');
    if (message) {
      var outputMsg = new Message(message);
      client.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message'));
    }
  }
}

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}

app.get('/', (req, res) => {
  console.log('Get request received: ');
  var html = `
  <html>
      <body>
          <h1>httpModule is running</h1>
      </body>
  </html>`
  res.send(html);
});

app.post('/', (req, res) => {
  var body = req.body;
  var message=JSON.stringify(body);
  console.log('Message received: ' + message);
  if (message) {
    var outputMsg = new Message(message);
    globalClient.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message'));
  }
  res.end('OK');

});

// Listen to the App Engine-specified port, or 8080 otherwise
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);