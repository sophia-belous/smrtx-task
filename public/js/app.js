(function() {
	'use strict';
	angular.module('smrtxApp', [
		'restangular',
		'ui.router',
		'ngMaterial',
		'ngMessages',
		'ngMdIcons',
		'common',
        'ui.utils.masks',
		'customer',
		'order',
		'file-model'
	]);
})();