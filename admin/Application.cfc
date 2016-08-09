<!--- NOTE: This is the SUB Application.cfc file. --->

<!---
    Include the root application.cfc. This will include the
    CFComponent tags and their contents. Bananas! I had no idea this
    would actually work. ColdFusion continues to amaze me.
--->
<cfinclude template="../Application.cfc" />


<!--- ----------------------------------------------------- --->
<!--- ----------------------------------------------------- --->


<!---
    Override any application-level settings. In this case, we
    are going to turn on session management.
--->
<cfset this.sessionManagement = true />
<cfset this.sessionTimeout = createTimeSpan( 0, 0, 5, 0 ) />


<cffunction name="onSessionStart" access="public" returntype="void" output="false" hint="I initialize the session.">\
    <!--- Set some session variables for testing. --->
    <cfset session.dateInitialized = now() />

    <!--- Return out. --->
    <cfreturn />
</cffunction>


<!---
    NOTE: This method starts with an "_". Since we included the root
    application, we can't declare methods twice. As such, we need to
    name this one differently at first, then perform some rename
    magic afterward (see end of file).
--->
<cffunction name="_onRequestStart" access="public" returntype="boolean" output="false" hint="I initialize the SUB request.">
    <!--- Invoke the super onRequestStart() method. --->
    <cfset super.onRequestStart( arguments[ 1 ] ) />

    <!--- Set a request variable for testing. --->
    <cfset request.isSubApplication = true />

    <!--- Redirect User to Login if without a Session--->
    <cfif not isDefined("SESSION.admin") OR not structKeyExists(SESSION.admin,"username")>
        <cflocation url="/login">
    </cfif>

    <!--- Return true so the page can process. --->
    <cfreturn true />
</cffunction>


<!--- ----------------------------------------------------- --->
<!--- ----------------------------------------------------- --->


<!---
    Create a super scope to fake component extention. Any function
    that we override, we have to keep a reference to it in this super
    scope since we will have to overwrite the reference to it.
--->
<cfset super = {} />

<!---
    In order to get around having dupliate function declarations, we
    had to name any sub-functions (that override root functions) to
    start with an "_". Now, we need to point the
    Loop over this component and point any method that starts with
    "_" to the target method name (who's reference should now be
    in super).
--->
<cfloop item="key" collection="#variables#">

    <!--- Chectk for a "local" method. --->
    <cfif reFind( "^_", key )>
        <!--- Copy oritinal reference into the fake super scope. --->
        <cfset super[ listFirst( key, "_" ) ] = variables[ listFirst( key, "_" ) ] />

        <!--- Now, move the "_" method in the main CFC scopes. --->
        <cfset this[ listFirst( key, "_" ) ] = this[ key ] />
        <cfset variables[ listFirst( key, "_" ) ] = variables[ key ] />

    </cfif>
</cfloop>