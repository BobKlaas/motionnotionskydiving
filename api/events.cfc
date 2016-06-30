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

	<!---Add Customer to Event--->
	<cffunction name="addCustomerToEvent" access="remote" httpMethod="POST" restPath="/customer/add/" returntype="any" produces="application/json">		
		<cfargument name="eventid" type="numeric" required="true">
		<cfargument name="firstname" type="string" required="true">
		<cfargument name="lastname" type="string" required="true">
		<cfargument name="emailaddress" type="string" required="true">
		<cfargument name="phonenumber" type="string" required="true">
		<cfargument name="address" type="string" required="false">
		<cfargument name="address2" type="string" required="false">
		<cfargument name="city" type="string" required="false">
		<cfargument name="stateid" type="numeric" required="false">
		<cfargument name="zipcode" type="numeric" required="false">
		<cfargument name="jumpslogged" type="numeric" required="false">
		<cfargument name="licenselevel" type="string" required="false">
		<cfargument name="primarydisciplineid" type="numeric" required="false">
		<cfargument name="homedropzoneid" type="numeric" required="false">
		<cfargument name="paymentreceived" type="numeric" required="false">
		<cfargument name="type" type="numeric" required="true">

		<cfstoredproc procedure="sp_get_event_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#eventid#" dbvarname="@eventid" null="#(structKeyExists(ARGUMENTS,eventid)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#firstname#" dbvarname="@firstname" null="#(structKeyExists(ARGUMENTS,firstname)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#lastname#" dbvarname="@lastname" null="#(structKeyExists(ARGUMENTS,lastname)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#emailaddress#" dbvarname="@emailaddress" null="#(structKeyExists(ARGUMENTS,emailaddress)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#phonenumber#" dbvarname="@phonenumber" null="#(structKeyExists(ARGUMENTS,phonenumber)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#address#" dbvarname="@address" null="#(structKeyExists(ARGUMENTS,address)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#address2#" dbvarname="@address2" null="#(structKeyExists(ARGUMENTS,address2)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#city#" dbvarname="@city" null="#(structKeyExists(ARGUMENTS,city)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#stateid#" dbvarname="@stateid" null="#(structKeyExists(ARGUMENTS,stateid)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#zipcode#" dbvarname="@zipcode" null="#(structKeyExists(ARGUMENTS,zipcode)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#jumpslogged#" dbvarname="@jumpslogged" null="#(structKeyExists(ARGUMENTS,jumpslogged)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#licenselevel#" dbvarname="@licenselevel" null="#(structKeyExists(ARGUMENTS,licenselevel)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#primarydisciplineid#" dbvarname="@primarydisciplineid" null="#(structKeyExists(ARGUMENTS,primarydisciplineid)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#homedropzoneid#" dbvarname="@homedropzoneid" null="#(structKeyExists(ARGUMENTS,homedropzoneid)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#paymentreceived#" dbvarname="@paymentreceived" null="#(structKeyExists(ARGUMENTS,paymentreceived)?'no':'yes')#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#type#" dbvarname="@type" null="#(structKeyExists(ARGUMENTS,type)?'no':'yes')#"/>
			<cfprocresult name="eventcustomer" resultset="1"/>	
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(eventcustomer)>
		<cfreturn ls>
	</cffunction>
	
    
</cfcomponent>