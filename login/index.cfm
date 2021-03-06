<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="app">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Motion Notion - Login</title>

    <base href="/login/" />

    <!-- 3rd-party libraries css -->
    <!-- build:css dist/css/lib.css -->
    <!-- inject:lib:css -->
    <link rel="stylesheet" href="src/lib/angular-material/angular-material.css">
    <link rel="stylesheet" href="src/lib/toastr/toastr.css">
    <link rel="stylesheet" href="src/lib/angular-loading-bar/build/loading-bar.css">
    <link rel="stylesheet" href="src/lib/bootstrap/dist/css/bootstrap.css">
    <!-- endinject -->
    <!-- endbuild -->

    <!---Material Icon Fonts--->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link href="/assets/css/modern-business.css" rel="stylesheet">
    <link href="/src/assets/css/app.css" rel="stylesheet"> 
</head>

<body ng-controller="appController">

    <!---Header--->
    <customheader></customheader>

    <div layout="row" flex layout-fill>
        <!---Sidenav--->        
        <customsidenav></customsidenav>
        
        <!---Content --->
        <md-content md-scroll-y layout="column" flex>
            <div data-ng-view="" class="view-fade-in" flex></div>       
        </md-content> 
    </div>

    <!-- 3rd-party libraries js -->
    <!-- build:js dist/js/lib.js -->
    <!-- inject:lib:js -->
    <script src="src/lib/jquery/dist/jquery.js"></script>
    <script src="src/lib/angular/angular.js"></script>
    <script src="src/lib/angular-aria/angular-aria.js"></script>
    <script src="src/lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="src/lib/angular-cookies/angular-cookies.js"></script>
    <script src="src/lib/angular-material/angular-material.js"></script>
    <script src="src/lib/angular-messages/angular-messages.js"></script>
    <script src="src/lib/angular-route/angular-route.js"></script>
    <script src="src/lib/angular-touch/angular-touch.js"></script>
    <script src="src/lib/angular-animate/angular-animate.js"></script>
    <script src="src/lib/ng-device-detector/ng-device-detector.js"></script>
    <script src="src/lib/re-tree/re-tree.js"></script>
    <script src="src/lib/toastr/toastr.js"></script>
    <script src="src/lib/angular-filter/dist/angular-filter.js"></script>
    <script src="src/lib/angular-filter/dist/angular-filter.min.js"></script>
    <script src="src/lib/angular-loading-bar/build/loading-bar.js"></script>
    <script src="src/lib/jszip/dist/jszip.js"></script>
    <script src="src/lib/ngMeta/dist/ngMeta.js"></script>
    <script src="src/lib/bootstrap/dist/js/bootstrap.js"></script>
    <!-- endinject -->
    <!-- endbuild -->

    <!--- API URL --->
    <script>
        <cfif CGI.HTTPS EQ "ON">
            var _hostName = "<cfoutput>#APPLICATION.SecureHostName#</cfoutput>";
        <cfelse>
            var _hostName = "<cfoutput>#APPLICATION.HostName#</cfoutput>";
        </cfif>     
    </script>

    <!--- Global JS --->
    <script src="/src/app/blocks/Utilities/utilities.module.js"></script>
    <script src="src/app/blocks/Logger/logger.module.js"></script>
    <script src="src/app/blocks/Logger/logger.js"></script>

    <!--- App JS--->
    <!-- build:js dist/js/app.js -->
    <script src="src/app/app.module.js"></script>

    <!---CORE--->
    <script src="src/app/_core/core.module.js"></script>
    <script src="src/app/_core/common.js"></script>
    <script src="src/app/_core/dataservice.js"></script>
    <script src="src/app/_core/routes.js"></script>
    <script src="src/app/_core/config.js"></script>

    <!---LOGIN--->    
    <script src="src/app/login/login.module.js"></script>
    <script src="src/app/login/login.js"></script>
</body>

</html>
