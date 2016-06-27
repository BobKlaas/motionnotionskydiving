
<cfcomponent rest="true" restPath="/dropzones" extends="api.utility">

	<!---Get Dropzones--->
	<cffunction name="getDropzones" access="remote" httpMethod="GET" restPath="/get/" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_dropzones" datasource="motion">
			<cfprocresult name="dropzones" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(dropzones)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Dropzones By Name--->
	<cffunction name="getDropzoneByName" access="remote" httpMethod="GET" restPath="/get/{dropzonename}" returntype="any" produces="application/json">		
		<cfargument name="dropzonename" type="string" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_dropzones" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#dropzonename#" dbvarname="@dropzonename"/>
			<cfprocresult name="dropzones" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(dropzones)>    
		<cfreturn ls>
	</cffunction>

</cfcomponent>