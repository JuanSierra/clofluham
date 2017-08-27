'use strict';

const Activity = require('../models/Activity');

module.exports = function(){
  return[
    {
      method: 'GET',
      path: '/api/activities',
      config: {
        cors : {
              origin: ['*'],
              additionalHeaders: ['cache-control', 'x-requested-with']
          }
      },
      handler: function (request, reply) {
    		Activity.find({}).populate('child').exec(function(err, activities){
    			if(err)
    				reply(err);

    			reply({activities});
    		});
      }
    },
    {
        method: 'POST',
        path: '/api/activities',
        config: {
          cors : {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: function (request, reply) {
      		var activity = new Activity();
      		activity.name = request.payload.name;
          activity.child = request.payload.child;

      		activity.save(function(err){
      			if(err)
      				reply(err);

      			reply({message: 'Activity created'});
      		});
        }
    },
    {
        method: 'DELETE',
        path: '/api/activities/{id}',
        config: {
          cors : {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: function (request, reply) {
    		var id = request.params.id;

    		Activity.findById(id).remove(function(err){
    			if(err)
    				reply(err);

    			reply({message: 'Activity removed'});
    		});
        }
    }
  ]
}();
