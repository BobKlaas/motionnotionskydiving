<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="app">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Motion Notion - Admin</title>

    <base href="/admin/" />

    <!-- 3rd-party libraries css -->
    <!-- build:css dist/css/lib.css -->
    <!-- inject:lib:css -->
    <link rel="stylesheet" href="src/lib/angular-material/angular-material.css">
    <link rel="stylesheet" href="src/lib/toastr/toastr.css">
    <link rel="stylesheet" href="src/lib/angular-loading-bar/build/loading-bar.css">
    <link rel="stylesheet" href="src/lib/cropperjs/dist/cropper.css">
    <link rel="stylesheet" href="src/lib/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="src/lib/lightgallery/dist/css/lightgallery.css">
    <!-- endinject -->
    <!-- endbuild -->

    <!---Material Icon Fonts--->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link href="/assets/css/modern-business.css" rel="stylesheet">
    <link href="/src/assets/css/app.css" rel="stylesheet">    
    <link href="src/assets/css/admin.css" rel="stylesheet">
</head>

<body ng-controller="appController">

    <!---Header--->
    <customheader></customheader>
 
    <!--- App Content --->
    <div layout="column" class="app-container" flex>
        <div data-ng-view="" flex layout="column" class="view-fade-in"></div>
    </div>

    <script src="https://www.youtube.com/iframe_api"></script>

    <!-- 3rd-party libraries js -->
    <!-- build:js dist/js/lib.js -->
    <!-- inject:lib:js -->
    <script src="src/lib/jquery/dist/jquery.js"></script>
    <script src="src/lib/angular/angular.js"></script>
    <script src="src/lib/angular-aria/angular-aria.js"></script>
    <script src="src/lib/angular-animate/angular-animate.js"></script>
    <script src="src/lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="src/lib/angular-cookies/angular-cookies.js"></script>
    <script src="src/lib/angular-input-masks/angular-input-masks-standalone.js"></script>
    <script src="src/lib/angular-messages/angular-messages.js"></script>
    <script src="src/lib/angular-material/angular-material.js"></script>
    <script src="src/lib/angular-route/angular-route.js"></script>
    <script src="src/lib/angular-sanitize/angular-sanitize.js"></script>
    <script src="src/lib/angular-touch/angular-touch.js"></script>
    <script src="src/lib/momentjs/moment.js"></script>
    <script src="src/lib/ng-device-detector/ng-device-detector.js"></script>
    <script src="src/lib/re-tree/re-tree.js"></script>
    <script src="src/lib/toastr/toastr.js"></script>
    <script src="src/lib/angular-loading-bar/build/loading-bar.js"></script>
    <script src="src/lib/angular-filter/dist/angular-filter.js"></script>
    <script src="src/lib/angular-filter/dist/angular-filter.min.js"></script>
    <script src="src/lib/angular-recaptcha/release/angular-recaptcha.js"></script>
    <script src="src/lib/angular-ui-mask/dist/mask.js"></script>
    <script src="src/lib/angular-youtube-mb/src/angular-youtube-embed.js"></script>
    <script src="src/lib/cropperjs/dist/cropper.js"></script>
    <script src="src/lib/angular-vimeo-embed/dist/angular-vimeo-embed.min.js"></script>
    <script src="src/lib/jszip/dist/jszip.js"></script>
    <script src="src/lib/ng-videosharing-embed/build/ng-videosharing-embed.min.js"></script>
    <script src="src/lib/ngMeta/dist/ngMeta.js"></script>
    <script src="src/lib/bootstrap/dist/js/bootstrap.js"></script>
    <script src="src/lib/lightgallery/dist/js/lightgallery.min.js"></script>
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
    <script src="/src/app/blocks/Logger/logger.module.js"></script>
    <script src="/src/app/blocks/Logger/logger.js"></script>

    <!--- App JS--->
    <!-- build:js dist/js/app.js -->
    <script src="src/app/app.module.js"></script>

    <!---CORE--->
    <script src="src/app/_core/core.module.js"></script>
    <script src="src/app/_core/common.js"></script>
    <script src="src/app/_core/dataservice.js"></script>
    <script src="src/app/_core/routes.js"></script>
    <script src="src/app/_core/config.js"></script>

    <!---HOME--->    
    <script src="src/app/home/home.module.js"></script>
    <script src="src/app/home/home.js"></script>

    <!---HOME--->    
    <script src="src/app/media/media.module.js"></script>
    <script src="src/app/media/browse.js"></script>

    <!---EVENTS--->    
    <script src="src/app/events/events.module.js"></script>
    <script src="src/app/events/list.js"></script>
    <script src="src/app/events/registered.js"></script>
    <script src="src/app/events/create.js"></script>
    <script src="src/app/events/addteam.js"></script>
    <script src="src/app/events/pricing.js"></script>
    <script src="src/app/events/overview.js"></script>


    <!---CONTRACTORS--->    
    <script src="src/app/contractors/contractors.module.js"></script>
    <script src="src/app/contractors/contractors.js"></script>
    <script src="src/app/contractors/create_step1.js"></script>
    <script src="src/app/contractors/create_step2.js"></script>
    <script src="src/app/contractors/create_step3.js"></script>
</body>

</html>
