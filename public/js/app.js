angular.module('Hamster', ['ngResource'])

.factory('Category', function($resource){
	return $resource("http://localhost:3000/api/categories");
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
});
