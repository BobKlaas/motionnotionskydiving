
    
<cfcomponent rest="true" restPath="/media" extends="api.utility">

	<!---Search Media by Contractor, Event, or Tag--->
	<cffunction name="searchMedia" access="remote" httpMethod="POST" restPath="/search/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.contractorid = structKeyExists(rc,'contractorid')?rc.contractorid:''>
		<cfset rc.eventid = structKeyExists(rc,'eventid')?rc.eventid:''>		
		<cfset rc.tag = structKeyExists(rc,'tag')?rc.tag:''>

		<!---Update Event Status --->
		<cfstoredproc procedure="sp_search_media" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid" null="#(len(trim(rc.contractorid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.eventid#" dbvarname="@eventid" null="#(len(trim(rc.eventid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.tag#" dbvarname="@tag" null="#(len(trim(rc.tag))?false:true)#"/>
			<cfprocresult name="media" resultset="1">
		</cfstoredproc>

		<cfset ls=QueryToStruct(media)>    
		<cfreturn ls>
	</cffunction>

</cfcomponent>