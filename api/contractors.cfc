<cfcomponent rest="true" restPath="/contractors" extends="api.utility">

	<!---Get All Contractors --->
	<cffunction name="getContractors" access="remote" httpMethod="GET" restPath="/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractors" datasource="motion">
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
	    
</cfcomponent>