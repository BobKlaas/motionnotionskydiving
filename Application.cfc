<cfcomponent> 

    <cfset THIS.name = "MotionNotionSkydiving">
    <cfset THIS.THISTimeout = CreateTimeSpan(0, 0, 60, 0)> 
    <cfset THIS.restOptions = structNew()>
    <cfset THIS.restOptions.apiFolder = ExpandPath("/api")>
    <cfset THIS.restOptions.serviceMapping = 'api2'>
    <cfset THIS.restsettings.skipcfcwitherror = true>
    <cfset THIS.restOptions.host = 'http://local.motionnotionskydiving.com/'>

    <cffunction name="OnApplicationStart" returntype="boolean" output="false">
    		<!--- Default --->
    		<cfset APPLICATION.apiurl = 'http://local.motionnotionskydiving.com'>

		<cfreturn true />
    </cffunction>

    <cffunction name="OnRequestStart" returntype="boolean" output="true">
    	<cfargument name="TargetPage" type="any" required="true" />	

        <!---Manual Reinit of Application--->
        <cfif structKeyExists(url, "reinit") and refind("1|true",url.reinit)>
            <cfset OnApplicationStart() />
        </cfif>

        <!---Create Rest API--->
		<cfset restInitApplication(THIS.restOptions.apiFolder,"api")>  

		<cfreturn true />
    </cffunction>

    <!---Request End--->
	<cffunction name="OnRequestEnd" returntype="void" output="true">
    	<cfargument type="String" name="targetPage" required="true"/> 
    </cffunction>

	<!---Error--->
	<!---<cffunction name="OnError" returntype="void" output="true">
    	<cfargument name="Exception" required=true/>

    	<!---Send Error Email--->
		<cfinclude template="ApplicationError.cfm" runonce="true" />

		<!---Add Task Fail Record to History--->
		<cfset THIS.taskCFC.InsertTaskHistory(REQUEST.taskname,0)>
    </cffunction> --->

</cfcomponent>