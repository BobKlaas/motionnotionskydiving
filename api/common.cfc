
<cfcomponent rest="true" restPath="/common" extends="api.utility">

	<!---Get US States--->
	<cffunction name="getStates" access="remote" httpMethod="GET" restPath="/states/get/" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_states" datasource="motion">
			<cfprocresult name="states" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(states)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Ratings--->
	<cffunction name="getRatings" access="remote" httpMethod="POST" restPath="/ratings/get/" returntype="any" produces="application/json">		
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>
		
		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.ratingid = structKeyExists(rc,'ratingid')?rc.ratingid:''>
		<cfset rc.agencyid = structKeyExists(rc,'agencyid')?rc.agencyid:''>

		<!---Get Ratings--->
		<cfstoredproc procedure="sp_get_ratings" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.ratingid#" dbvarname="@ratingid" null="#(len(trim(rc.ratingid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.agencyid#" dbvarname="@agencyid" null="#(len(trim(rc.agencyid))?false:true)#"/>
			<cfprocresult name="ratings" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(ratings)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Skills By Category--->
	<cffunction name="getSkillsByCategory" access="remote" httpMethod="GET" restPath="/skills/get/{categoryid}" returntype="any" produces="application/json">	
		<cfargument name="categoryid" type="numeric" required="false" default="1">
		<cfstoredproc procedure="sp_get_skills" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#categoryid#" dbvarname="@skillcategoryid"/>
			<cfprocresult name="skills" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(skills)>    
		<cfreturn ls>
	</cffunction>

</cfcomponent>