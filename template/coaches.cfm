<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Motion Notion Skydiving</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/modern-business.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!---Navigation--->
    <cfinclude template="navigation.cfm">

    <!-- Page Content -->
    <div class="container">

        <!-- Page Heading/Breadcrumbs -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Coaches
                </h1>
                <ol class="breadcrumb">
                    <li><a href="index.cfm">Home</a>
                    </li>
                    <li class="active">Coaches</li>
                </ol>
            </div>
        </div>
        <!-- /.row -->


        <!--Coaches-->
        <div class="row">
            
            <cfhttp url="http://local.motionnotionskydiving.com/rest/api/contractors/get" result="restResult" method="GET"/>
            <cfset contractors = deserializeJSON(restResult.fileContent)>

            <!--- <cfdump var="#contractors#"> --->

            <!---Coaches--->
            <cfoutput>
                <cfloop from="1" to="#ArrayLen(contractors)#" index="i">
                    <div class="col-md-4 text-center">
                        <div class="thumbnail">
                            <img class="img-responsive" src="/assets/images/contractors/#contractors[i].imagename#" alt="">
                            <div class="caption">
                                <h3>#contractors[i].firstname# #contractors[i].lastname#<br>
                                    <small>Motion Coach</small>
                                </h3>
                                <!--- <p>#contractors[i].firstname# is one of the Motion Notion coaches.</p> ---><br>
                                <ul class="list-inline">

                                    <cfif len(trim(contractors[i].instagramurl))>
                                        <li><a href="#contractors[i].instagramurl#" target="_blank"><i class="fa fa-2x fa-instagram"></i></a></li>
                                    </cfif>
                                    <cfif len(trim(contractors[i].facebookurl))>
                                        <li><a href="#contractors[i].facebookurl#" target="_blank"><i class="fa fa-2x fa-facebook"></i></a></li>
                                    </cfif>
                                    <cfif len(trim(contractors[i].linkedinurl))>
                                        <li><a href="#contractors[i].linkedinurl#" target="_blank"><i class="fa fa-2x fa-linkedin"></i></a></li>
                                    </cfif>
                                    <cfif len(trim(contractors[i].videourl))>
                                        <li><a href="#contractors[i].videourl#" target="_blank"><i class="fa fa-2x fa-video-camera"></i></a></li>
                                    </cfif>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </cfloop>
            </cfoutput>

        </div>



        <!-- Our Customers -->
        <!-- <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Our Customers</h2>
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
                <img class="img-responsive customer-img" src="http://placehold.it/500x300" alt="">
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
                <img class="img-responsive customer-img" src="http://placehold.it/500x300" alt="">
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
                <img class="img-responsive customer-img" src="http://placehold.it/500x300" alt="">
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
                <img class="img-responsive customer-img" src="http://placehold.it/500x300" alt="">
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
                <img class="img-responsive customer-img" src="http://placehold.it/500x300" alt="">
            </div>
            <div class="col-md-2 col-sm-4 col-xs-6">
                <img class="img-responsive customer-img" src="http://placehold.it/500x300" alt="">
            </div>
        </div> -->
        <!-- /.row -->

        <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Motion Notion 2016</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
