
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

	<!---Get Skills--->
	<cffunction name="getSkills" access="remote" httpMethod="POST" restPath="/skills/get/" returntype="any" produces="application/json">	
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>
		
		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.skillcategoryid = structKeyExists(rc,'skillcategoryid')?rc.skillcategoryid:''>
		<cfset rc.active = structKeyExists(rc,'active')?rc.active:''>

		<cfstoredproc procedure="sp_get_skills" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.skillcategoryid#" dbvarname="@skillcategoryid" null="#(len(trim(rc.skillcategoryid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.active#" dbvarname="@active" null="#(len(trim(rc.active))?false:true)#"/>
			<cfprocresult name="skills" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(skills)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Skill Levels--->
	<cffunction name="getSkillLevels" access="remote" httpMethod="POST" restPath="/skill/levels/get/" returntype="any" produces="application/json">	
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>
		
		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.id = structKeyExists(rc,'id')?rc.id:''>

		<cfstoredproc procedure="sp_get_skill_levels" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.id#" dbvarname="@id" null="#(len(trim(rc.id))?false:true)#"/>
			<cfprocresult name="levels" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(levels)>    
		<cfreturn ls>
	</cffunction>

</cfcomponent>