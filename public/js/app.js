angular.module('Hamster', ['ngResource'])

.factory('Category', function($resource){
	return $resource("http://localhost:3000/api/categories/:name");
})

.factory('Activity', function($resource){
	return $resource("http://localhost:3000/api/activities/:activity_id");
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
				})
			});
		},
		'saveCategory': function(category){
			Category.save(category).$promise.then(function(){
				self.loadCategories();
				self.selectedCategory = null;
			});
		},
		'removeCategory': function(category){
			console.log('enter ' + category);
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
		console.log('sdsd')
		CategoryService.removeCategory(category);
	};
})

.service('ActivityService', function(Activity){
	var self = {
		'activities' : [],
		'selectedActivity' : null,
		'loadActivities' : function(){
			self.categories = [];
			Activity.get(function(data){
				angular.forEach(data.activities, function(activity){
					self.activities.push(new Activity(activity));
				})
			});
		},
		'saveCategory': function(activity){
			Activity.save(activity).$promise.then(function(){
				self.loadActivities();
				self.selectedActivity = null;
			});
		},
		'removeCategory': function(activity){
			Activity.remove({name:category.name}).$promise.then(function(){
				self.loadActivities();
				self.selectedActivity = null;
			});
		}
	};

	self.loadCategories();

	return self;
})

.controller('activity', function($scope, ActivityService){
	$scope.service = ActivityService;
	$scope.newCategory = function () {
		ActivityService.saveActivity($scope.service.selectedActivity);
	};
	$scope.removeCategory = function(activity){
		ActivityService.saveActivity(activity);
	};
})
;
