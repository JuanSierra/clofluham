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
		'loadCategories' : function(){
			self.categories = [];
			Category.get(function(data){
				angular.forEach(data.categories, function(category){
					self.categories.push(new Category(category));
				});
			});
		},
		'saveCategory': function(category){
			Category.save(category).$promise.then(function(){
				self.loadCategories();
				self.selectedCategory = null;
			});
		},
		'removeCategory': function(category){
			Category.remove({name:category.name}).$promise.then(function(){
				self.loadCategories();
				self.selectedCategory = null;
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
		'selectedActivity' : null,
		'loadActivities' : function(){
			self.activities = [];
			Activity.get(function(data){
				angular.forEach(data.activities, function(activity){
					self.activities.push(new Activity(activity));
				})
			});
		},
		'saveActivity': function(activity){
			Activity.save(activity).$promise.then(function(){
				self.loadActivities();
				self.selectedActivity = null;
			});
		},
		'removeActivity': function(activity){
			Activity.remove({id:activity._id}).$promise.then(function(){
				self.loadActivities();
				self.selectedActivity = null;
			});
		}
	};

	self.loadActivities();

	return self;
})

.controller('activity', function($scope, ActivityService, CategoryService){
	$scope.service = ActivityService;
	$scope.service2 = CategoryService;
	$scope.firstCategory = CategoryService.categories[0];

	$scope.newActivity = function () {
		ActivityService.saveActivity($scope.service.selectedActivity);
	};
	$scope.removeActivity = function(activity){
		ActivityService.removeActivity(activity);
	};
	$scope.editActivity = function(activity){
		$scope.toEdit = activity;
		console.log(activity)
	};
});
