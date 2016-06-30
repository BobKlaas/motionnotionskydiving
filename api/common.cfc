
<cfcomponent rest="true" restPath="/common" extends="api.utility">

	<!---Get US States--->
	<cffunction name="getStates" access="remote" httpMethod="GET" restPath="/states/get/" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_states" datasource="motion">
			<cfprocresult name="states" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(states)>    
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