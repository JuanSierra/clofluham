angular.module('Hamster', ['ngResource'])

.factory('Category', function($resource){
	return $resource("http://localhost:3000/api/categories/:name");
})

.factory('Activity', function($resource){
	return $resource("http://localhost:3000/api/activities/:id");
})

.service('CategoryService', function(Category){
	var self = {
		'categories' : [],
		'selectedCategory' : null,
		'default':null,
		'loadCategories' : function(){
			self.categories = [];
			Category.get(function(data){
				angular.forEach(data.categories, function(category){
					self.categories.push(new Category(category));
				});

				self.default = self.categories[0];
			});
		},
		'saveCategory': function(category){
			Category.save(category).$promise.then(function(){
				self.loadCategories();
				self.selectedCategory = null;

				setTimeout(function(){ redim.call($('.acc-btn')[0]) }, 100);
			});
		},
		'removeCategory': function(category){
			Category.remove({name:category.name}).$promise.then(function(){
				self.loadCategories();
				self.selectedCategory = null;

				setTimeout(function(){ redim.call($('.acc-btn')[0]) }, 100);
			});
		}
	};

	self.loadCategories();

	return self;
})

.controller('category', function($scope, CategoryService){
	$scope.service = CategoryService;

	$scope.newCategory = function () {
		CategoryService.saveCategory($scope.service.selectedCategory);
	};
	$scope.removeCategory = function(category){
		CategoryService.removeCategory(category);
	};
})

.service('ActivityService', function(Activity){
	var self = {
		'activities' : [],
		'selectedActivity' : {},
		'loadActivities' : function(){
				self.activities = [];
				Activity.get(function(data){
					angular.forEach(data.activities, function(activity){
						self.activities.push(new Activity(activity));
					});
				});
			},
		'saveActivity': function(activity){
			Activity.save(activity).$promise.then(function(){
				self.loadActivities();
				self.selectedActivity = null;

				setTimeout(function(){ redim.call($('.acc-btn')[1]) }, 100);
			});
		},
		'removeActivity': function(activity){
				Activity.remove({id:activity._id}).$promise.then(function(){
					self.loadActivities();

					setTimeout(function(){ redim.call($('.acc-btn')[1]) }, 100);
				});
			}
	};

	self.loadActivities();

	return self;
})

.controller('activity', function($scope, ActivityService, CategoryService){
	$scope.service = ActivityService;
	$scope.service2 = CategoryService;

	$scope.newActivity = function () {
		ActivityService.saveActivity($scope.service.selectedActivity);
	};
	$scope.removeActivity = function(activity){
		ActivityService.removeActivity(activity);
	};
	$scope.editActivity = function(activity){
		$scope.toEdit = activity;
	};
});
