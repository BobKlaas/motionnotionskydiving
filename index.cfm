<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="app">

<head>
    <!-- ICONS/TILES/WHATEVER REALLY NEED A MORE UNIVERSAL STANDARD -->
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png">
    <link rel="manifest" href="/assets/images/favicon/manifest.json">

    <!--META-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/assets/images/favicon/ms-icon-144x144.png">
    <meta name="msapplication-TileImage" content="/assets/images/apple-icon-144x144.png">
    <meta name="msapplication-TileColor" content="#2A2A2A">
    <meta name="theme-color" content="#ffffff">
    <meta property="og:image" content=""/> <!--Need to add image-->
    <meta name="author" content="Robert Klaas">
    <meta name="keywords" content="skydiving,motion notion,motion,dropzone,freefly,tracking,angle tracking,camps,coaching,lake elsinore,parachute,USPA,skydiver,training,swooping,formation skydiving,canopy,flight">
    <base href="/">

    <!--Dynamic Meta-->
    <meta name="application-name" content="Motion Notion">
    <meta property="og:site_name" content="Motion Notion"/>
    <meta property="og:url" metaproperty="url" content="{{ngMeta.url}}" />
    <meta name="description" metaproperty="description" content="{{ngMeta.description}}">   
    <meta property="og:description" metaproperty="description" content="{{ngMeta.description}}"/>

    <!--Title-->
    <meta property="og:title" metaproperty="title" content="{{ngMeta.title}}"/>
    <title ng-bind="ngMeta.title"></title>

    <!-- 3rd-party libraries css -->
    <!-- build:css dist/css/lib.css -->
    <!-- inject:lib:css -->
    <link rel="stylesheet" href="src/lib/angular-material/angular-material.css">
    <link rel="stylesheet" href="src/lib/toastr/toastr.css">
    <link rel="stylesheet" href="src/lib/angular-loading-bar/build/loading-bar.css">
    <link rel="stylesheet" href="src/lib/bootstrap/dist/css/bootstrap.css">
    <!-- endinject -->
    <!-- endbuild -->  

    <!-- Custom Fonts -->
    <link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- Custom CSS -->
    <link href="/assets/css/modern-business.css" rel="stylesheet">
    <link href="src/assets/css/app.css" rel="stylesheet">    
</head>

<body ng-controller="appController">

    <!---Navigation--->
    <customheader></customheader>

    <!---Slideshow--->
    <customslideshow ng-show="common.showslideshow()"></customslideshow>

    <div layout="column" class="app-container" layout-align="center center" flex>
        <div data-ng-view="" class="view-fade-in"></div>
    </div>

  <!---   <!-- Page Content -->
    <div class="container">

        <!-- Marketing Icons Section -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">
                    Administrator Login
                </h1>
            </div>
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-check"></i> Bootstrap v3.2.0</h4>
                    </div>
                    <div class="panel-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, optio corporis quae nulla aspernatur in alias at numquam rerum ea excepturi expedita tenetur assumenda voluptatibus eveniet incidunt dicta nostrum quod?</p>
                        <a href="#" class="btn btn-default">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.row -->

        <hr> --->

    </div>
    <!-- /.container -->



    <!-- 3rd-party libraries js -->
    <!-- inject:lib:js -->
    <script src="src/lib/jquery/dist/jquery.js"></script>
    <script src="src/lib/angular/angular.js"></script>
    <script src="src/lib/angular-animate/angular-animate.js"></script>
    <script src="src/lib/angular-aria/angular-aria.js"></script>
    <script src="src/lib/angular-cookies/angular-cookies.js"></script>
    <script src="src/lib/angular-material/angular-material.js"></script>
    <script src="src/lib/angular-messages/angular-messages.js"></script>
    <script src="src/lib/angular-route/angular-route.js"></script>
    <script src="src/lib/ng-device-detector/ng-device-detector.js"></script>
    <script src="src/lib/re-tree/re-tree.js"></script>
    <script src="src/lib/toastr/toastr.js"></script>
    <script src="src/lib/angular-loading-bar/build/loading-bar.js"></script>
    <script src="src/lib/jszip/dist/jszip.js"></script>
    <script src="src/lib/ngMeta/dist/ngMeta.js"></script>
    <script src="src/lib/bootstrap/dist/js/bootstrap.js"></script>
    <!-- endinject -->
    <!-- endbuild -->

    <!--- Global JS --->
    <script src="src/app/blocks/Utilities/utilities.module.js"></script>
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

    <!---HOME--->
    <script src="src/app/home/home.module.js"></script>
    <script src="src/app/home/home.js"></script>

</body>

</html>
