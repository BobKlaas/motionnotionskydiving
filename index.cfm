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
    <meta name="google-site-verification" content="Db-C5CrbnpVPrW8vq1-Jt-1fgV21YzkduMRXONA8Zbk" />
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
    <link rel="stylesheet" href="src/lib/lightgallery/dist/css/lightgallery.css">
    <!-- endinject -->
    <!-- endbuild -->  

    <!--Custom CSS -->
    <link href="/assets/css/modern-business.css" rel="stylesheet">
    <link href="/src/assets/css/app.css" rel="stylesheet">    

    <!---Material Icon Fonts--->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body ng-controller="appController">

    <!---Navigation--->
    <customheader></customheader>

    <!---Slideshow--->
    <customslideshow ng-show="common.showslideshow()"></customslideshow>

    <!---Angular NGVIEW Include Content--->
    <div layout="column" class="app-container" layout-align="center center" flex>
        <div data-ng-view="" class="view-fade-in"></div>
    </div>
    
    <script src="//www.google.com/recaptcha/api.js?render=explicit&onload=vcRecapthaApiLoaded"></script>
    <script src="https://www.youtube.com/iframe_api"></script>
    
    <!-- 3rd-party libraries js -->
    <!-- inject:lib:js -->
    <script src="src/lib/jquery/dist/jquery.js"></script>
    <script src="src/lib/angular/angular.js"></script>
    <script src="src/lib/angular-animate/angular-animate.js"></script>
    <script src="src/lib/angular-aria/angular-aria.js"></script>
    <script src="src/lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="src/lib/angular-cookies/angular-cookies.js"></script>
    <script src="src/lib/angular-material/angular-material.js"></script>
    <script src="src/lib/angular-messages/angular-messages.js"></script>
    <script src="src/lib/angular-route/angular-route.js"></script>
    <script src="src/lib/angular-touch/angular-touch.js"></script>
    <script src="src/lib/ng-device-detector/ng-device-detector.js"></script>
    <script src="src/lib/re-tree/re-tree.js"></script>
    <script src="src/lib/toastr/toastr.js"></script>
    <script src="src/lib/angular-filter/dist/angular-filter.min.js"></script>
    <script src="src/lib/angular-loading-bar/build/loading-bar.js"></script>
    <script src="src/lib/angular-recaptcha/release/angular-recaptcha.js"></script>
    <script src="src/lib/angular-ui-mask/dist/mask.js"></script>
    <script src="src/lib/angular-vimeo-embed/dist/angular-vimeo-embed.min.js"></script>
    <script src="src/lib/angular-youtube-mb/src/angular-youtube-embed.js"></script>
    <script src="src/lib/jszip/dist/jszip.js"></script>
    <script src="src/lib/ngMeta/dist/ngMeta.js"></script>
    <script src="src/lib/bootstrap/dist/js/bootstrap.js"></script>
    <script src="src/lib/lightgallery/dist/js/lightgallery.min.js"></script>
    <!-- endinject -->
    <!-- endbuild -->

    <cfset adminAuthenticated = (isDefined('SESSION.ADMIN.ID')?SESSION.ADMIN.ID:'')>

    <!--- API URL --->
    <script>
        <cfif CGI.HTTPS EQ "ON">
            var _hostName = "<cfoutput>#APPLICATION.SecureHostName#</cfoutput>";
        <cfelse>
            var _hostName = "<cfoutput>#APPLICATION.HostName#</cfoutput>";
        </cfif>     
        var _FacebookURL = "<cfoutput>#REQUEST.FacebookURL#</cfoutput>";
        var _GoogleURL = "<cfoutput>#REQUEST.GoogleURL#</cfoutput>";
        var _YouTubeURL = "<cfoutput>#REQUEST.YouTubeURL#</cfoutput>";
        var _InstagramURL = "<cfoutput>#REQUEST.InstagramURL#</cfoutput>";
        var _AdminEmail = "<cfoutput>#REQUEST.AdminEmail#</cfoutput>";
        var _TeamEmail = "<cfoutput>#REQUEST.TeamEmail#</cfoutput>";
        var _AdminID = "<cfoutput>#adminAuthenticated#</cfoutput>";
    </script>
    
    <!--- Global JS --->
    <script src="https://use.fontawesome.com/8f5495f3bb.js"></script>
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

    <!---HOME--->
    <script src="src/app/home/home.module.js"></script>
    <script src="src/app/home/home.js"></script>
    <script src="src/app/home/about.js"></script>
    <script src="src/app/home/contact.js"></script>

    <!---COACH--->
    <script src="src/app/coach/coach.module.js"></script>
    <script src="src/app/coach/list.js"></script>
    <script src="src/app/coach/view.js"></script>

    <!---EVENTS--->
    <script src="src/app/event/event.module.js"></script>
    <script src="src/app/event/list.js"></script>
    <script src="src/app/event/view.js"></script>
    <script src="src/app/event/register_step1.js"></script>
    <script src="src/app/event/register_step2.js"></script>
    <script src="src/app/event/register_reservelist.js"></script>
    <script src="src/app/event/register_confirm.js"></script>
    <script src="src/app/event/policy.js"></script>

    <!---MEDIA--->
    <script src="src/app/media/media.module.js"></script>
    <script src="src/app/media/media.js"></script>

    <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    
</body>

</html>
