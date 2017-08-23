'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const routes = require('./api/routes');
const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

for (var route in routes) {
	server.route(routes[route]);
}

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at: ${server.info.uri}');
});

mongoose.connect('localhost', 'CLOFLUHAM', 27017, function(err) {
  if (err) {
    console.log('Could not connect to mongo: ' + err);
    process.exit(1);
  }
});
