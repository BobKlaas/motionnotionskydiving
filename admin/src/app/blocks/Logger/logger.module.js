(function() {
    'use strict';

    angular.module('Logger', [])

    // Angular Constants
    // toastr is actually set in toastr.js as window.toastr
    // making globally available here.
    .constant('toastr', toastr)

    .config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 8000;
        toastr.options.positionClass = 'toast-top-right';
    }

})();
