(function() {
    angular.module('appFilters', [])
        .filter('daysAgo', daysAgo)
        ;
        function daysAgo() {
            return function (date) {
                return moment(new Date(date)).fromNow();
            };
        };
})();