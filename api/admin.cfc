<cfcomponent rest="true" restPath="/admin" extends="api.utility">

	<!---Login Administrator--->
	<cffunction name="authenticate" access="remote" httpMethod="POST" restPath="/authenticate/" returntype="any" produces="application/json">		
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.username = structKeyExists(rc,'username')?trim(rc.username):''>
		<cfset rc.password = structKeyExists(rc,'password')?trim(rc.password):''>
		<cfset rc.encpassword = structKeyExists(rc,'password')?hash(rc.password,"SHA"):''>		

		<!---Authenticate Admin--->
		<cfstoredproc procedure="sp_admin_login" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" maxlength="50" value="#rc.username#" dbvarname="@username"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" maxlength="250" value="#rc.encpassword#" dbvarname="@password"/>
			<cfprocresult name="admin" resultset="1"/>
			<cfprocresult name="result" resultset="2"/>
		</cfstoredproc>

		<!---Create Session--->
		<cfif result.loginValid>
			<cfset SESSION.admin.id = admin.id>
			<cfset SESSION.admin.username = admin.username>
			<cfset SESSION.admin.firstname = admin.firstname>
			<cfset SESSION.admin.lastname = admin.lastname>
			<cfset SESSION.admin.emailaddress = admin.emailaddress>
			<cfset result.sessioncreated = 1>
		</cfif>

		<!---Create Structure From Results--->
		<cfset login = structNew()>
		<cfset login.admin = QueryToStruct(admin)>
		<cfset login.result = QueryToStruct(result)>
		<cfset JSONReturn = SerializeJSON(login)>
		<cfreturn JSONReturn>
	</cffunction>

</cfcomponent>