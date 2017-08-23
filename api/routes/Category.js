'use strict';

const Category = require('../models/Category');

module.exports = function(){
  return[
    {
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
    },
    {
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
    },
    {
        method: 'DELETE',
        path: '/api/categories/{name}',
        config: {
          cors : {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: function (request, reply) {
    		//var category = new Category();
    		var pName = request.params.name;
    		Category.find({name:pName}).remove(function(err){
    			if(err)
    				reply(err);

    			reply({message: 'Category removed'});
    		});
        }
    }
  ]
}();
