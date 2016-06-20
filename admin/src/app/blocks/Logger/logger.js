(function() {
    'use strict';

    angular
        .module('Logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    function logger($log, toastr) {
        var service = {

            // turn off the toasts programmatically.
            showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warn    : warn,
            clear   : clear,
            remove  : remove

        };

        return service;
        /////////////////////

        function error(message, data, title, overrideOptions) {
            if(service.showToasts){
                toastr.error(message, title, overrideOptions);
            }
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title, overrideOptions) {
            if(service.showToasts){
                toastr.info(message, title, overrideOptions);
            }
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title, overrideOptions) {
            if(service.showToasts){
                toastr.success(message, title, overrideOptions);
            }
            $log.info('Success: ' + message, data);
        }

        function warn(message, data, title, overrideOptions) {
            if(service.showToasts){
                toastr.warning(message, title, overrideOptions);
            }
            $log.warn('Warning: ' + message, data);
        }

        function clear(){
            toastr.clear();
        }

        function remove(){
            toastr.remove();
        }

    }
}());
