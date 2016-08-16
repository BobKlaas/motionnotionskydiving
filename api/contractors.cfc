<cfcomponent rest="true" restPath="/contractors" extends="api.utility">

	<!---Get All Contractors --->
	<cffunction name="getContractors" access="remote" httpMethod="GET" restPath="/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractors" datasource="motion">
			<cfprocresult name="contractors" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(contractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get All Active Contractors --->
	<cffunction name="getActiveContractors" access="remote" httpMethod="GET" restPath="/get/active" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractors" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_BIT" value="1" dbvarname="@active"/>
			<cfprocresult name="contractors" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(contractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Contractor Roles--->
	<cffunction name="getContractorRoles" access="remote" httpMethod="GET" restPath="/roles/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractor_roles" datasource="motion">
			<cfprocresult name="contractors" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(contractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Contractor Details --->
	<cffunction name="getContractorByUniqueName" access="remote" httpMethod="GET" restPath="/get/{uniquename}" returntype="any" produces="application/json">
		<cfargument name="uniquename" type="string" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_contractor_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#uniquename#" dbvarname="@uniquename"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="skills" resultset="2">
			<cfprocresult name="ratings" resultset="3">		
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset contractor = structNew()>
		<cfset contractor.details = QueryToStruct(details)>
		<cfset contractor.skills = QueryToStruct(skills)>
		<cfset contractor.ratings = QueryToStruct(ratings)>
		<cfset JSONReturn = SerializeJSON(contractor)>
		<cfreturn JSONReturn>
	</cffunction>


	<!---Update Event Status--->
	<cffunction name="updateContractorStatus" access="remote" httpMethod="POST" restPath="/update/status/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.contractorid = structKeyExists(rc,'contractorid')?rc.contractorid:''>
		<cfset rc.status = structKeyExists(rc,'status')?rc.status:''>

		<!---Update Event Status --->
		<cfstoredproc procedure="sp_update_contractor_status" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid"/>
			<cfprocparam cfsqltype="CF_SQL_BIT" value="#rc.status#" dbvarname="@status"/>
			<cfprocresult name="contractor" resultset="1">
		</cfstoredproc>

		<cfset ls=QueryToStruct(contractor)>    
		<cfreturn ls>
	</cffunction>



	<!---Get Contractor Media --->
	<cffunction name="getContractorMedia" access="remote" httpMethod="GET" restPath="/media/{contractorid}" returntype="any" produces="application/json">
		<cfargument name="contractorid" type="string" required="true" restargsource="path">
		
		<cfstoredproc procedure="sp_get_media_by_contractor" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#arguments.contractorid#" dbvarname="@contractorid"/>
			<cfprocresult name="media" resultset="1">
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls = QueryToStruct(media)>
		<cfreturn ls>
	</cffunction>
	    
	    
</cfcomponent>