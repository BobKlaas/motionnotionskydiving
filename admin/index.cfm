<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="app">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Motion Notion - Admin</title>

    <base href="/admin/">

    <!-- 3rd-party libraries css -->
    <!-- build:css dist/css/lib.css -->
    <!-- inject:lib:css -->
    <link rel="stylesheet" href="src/lib/angular-material/angular-material.css">
    <link rel="stylesheet" href="src/lib/toastr/toastr.css">
    <link rel="stylesheet" href="src/lib/angular-loading-bar/build/loading-bar.css">
    <link rel="stylesheet" href="src/lib/bootstrap/dist/css/bootstrap.css">
    <!-- endinject -->
    <!-- endbuild -->

    

    <!-- Custom CSS -->
    <link href="/css/modern-business.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link href="src/assets/css/app.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!---Navigation--->
    <cfinclude template="/navigation.cfm">

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
    <!-- build:js dist/js/lib.js -->
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

</body>

</html>
