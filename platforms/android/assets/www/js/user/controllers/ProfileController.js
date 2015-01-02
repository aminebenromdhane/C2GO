'use strict';

angular.module('addicaid').controller('ProfileController', ['userService',
function (userService) {
    var _this = this;
    this.user = {};
    this.loading = false;
    this.error = null;

}]);