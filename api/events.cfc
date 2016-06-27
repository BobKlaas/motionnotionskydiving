<cfcomponent rest="true" restPath="/events" extends="api.utility">

	<!---Get All Events--->
	<cffunction name="getEvents" access="remote" httpMethod="GET" restPath="/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_events" datasource="motion">
			<cfprocresult name="events" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(events)>    
		<cfreturn ls>
	</cffunction>


	<!---Get Event By ID--->
	<cffunction name="getEventByID" access="remote" httpMethod="GET" restPath="/get/{eventid}" returntype="any" produces="application/json">		
		<cfargument name="eventid" type="numeric" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_event_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#eventid#" dbvarname="@eventid"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="contractors" resultset="2">
			<cfprocresult name="customers" resultset="3">
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset event = structNew()>
		<cfset event.details = QueryToStruct(details)>
		<cfset event.contractors = QueryToStruct(contractors)>
		<cfset event.customers = QueryToStruct(customers)>
		<cfset JSONReturn = SerializeJSON(event)>
		<cfreturn JSONReturn>
	</cffunction>

	    
</cfcomponent>