(function() {
	'use strict';
	angular.module('common').filter('daysAgo', daysAgo);

	function daysAgo() {
		return function(date) {
			return moment(new Date(date)).fromNow();
		};
	}
})();