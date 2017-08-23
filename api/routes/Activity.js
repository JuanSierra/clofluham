'use strict';

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
  		Activity.find(function(err, categories){
  			if(err)
  				reply(err);

  			reply({categories});
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
        activity.name = request.payload.category_id;

    		Activity.save(function(err){
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
    		Activity.find({id:id}).remove(function(err){
    			if(err)
    				reply(err);

    			reply({message: 'Activity removed'});
    		});
        }
    }
  ]
}();
