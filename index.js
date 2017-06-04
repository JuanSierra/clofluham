'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const Category = require('./models/Category');
const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/api/categories',
    config: {
      cors : {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: function (request, reply) {
		Category.find(function(err, categories){
			if(err)
				reply(err);

			reply({categories});
		});
    }
});

server.route({
    method: 'POST',
    path: '/api/categories',
    config: {
      cors : {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: function (request, reply) {
		var category = new Category();
		category.name = request.payload.name;

		category.save(function(err){
			if(err)
				reply(err);

			reply({message: 'Category created'});
		});
    }
});

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
