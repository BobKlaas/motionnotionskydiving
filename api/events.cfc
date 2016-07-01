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
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.id = structKeyExists(rc,'id')?rc.id:''>
		<cfset rc.eventid = structKeyExists(rc,'eventid')?rc.eventid:''>
		<cfset rc.firstname = structKeyExists(rc,'firstname')?rc.firstname:''>
		<cfset rc.lastname = structKeyExists(rc,'lastname')?rc.lastname:''>
		<cfset rc.emailaddress = structKeyExists(rc,'emailaddress')?rc.emailaddress:''>
		<cfset rc.phonenumber = structKeyExists(rc,'phonenumber')?rc.phonenumber:''>
		<cfset rc.address = structKeyExists(rc,'address')?rc.address:''>
		<cfset rc.address2 = structKeyExists(rc,'address2')?rc.address2:''>
		<cfset rc.city = structKeyExists(rc,'city')?rc.city:''>
		<cfset rc.stateid = structKeyExists(rc,'stateid')?rc.stateid:''>
		<cfset rc.zipcode = structKeyExists(rc,'zipcode')?rc.zipcode:''>
		<cfset rc.jumpslogged = structKeyExists(rc,'jumpslogged')?rc.jumpslogged:''>
		<cfset rc.uspalicense = structKeyExists(rc,'uspalicense')?rc.uspalicense:''>
		<cfset rc.primarydisciplineid = structKeyExists(rc,'primarydisciplineid')?rc.primarydisciplineid:''>
		<cfset rc.homedropzoneid = structKeyExists(rc,'homedropzoneid')?rc.homedropzoneid:''>
		<cfset rc.homedropzonename = structKeyExists(rc,'homedropzonename')?rc.homedropzonename:''>
		<cfset rc.paymentreceived = structKeyExists(rc,'paymentreceived')?rc.paymentreceived:''>
		<cfset rc.type = structKeyExists(rc,'type')?rc.type:''>

		<!---Add Customer to Event --->
		<cfstoredproc procedure="sp_add_event_customer" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.eventid#" dbvarname="@eventid" null="#(len(trim(rc.eventid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.firstname#" dbvarname="@firstname" null="#(len(trim(rc.firstname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.lastname#" dbvarname="@lastname" null="#(len(trim(rc.lastname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.emailaddress#" dbvarname="@emailaddress" null="#(len(trim(rc.emailaddress))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.phonenumber#" dbvarname="@phonenumber" null="#(len(trim(rc.phonenumber))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address#" dbvarname="@address" null="#(len(trim(rc.address))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address2#" dbvarname="@address2" null="#(len(trim(rc.address2))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.city#" dbvarname="@city" null="#(len(trim(rc.city))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.stateid#" dbvarname="@stateid" null="#(len(trim(rc.stateid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.zipcode#" dbvarname="@zipcode" null="#(len(trim(rc.zipcode))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.jumpslogged#" dbvarname="@jumpslogged" null="#(len(trim(rc.jumpslogged))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.uspalicense#" dbvarname="@uspalicense" null="#(len(trim(rc.uspalicense))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.primarydisciplineid#" dbvarname="@primarydisciplineid" null="#(len(trim(rc.primarydisciplineid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.homedropzoneid#" dbvarname="@homedropzoneid" null="#(len(trim(rc.homedropzoneid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.homedropzonename#" dbvarname="@homedropzonename" null="#(len(trim(rc.homedropzonename))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.paymentreceived#" dbvarname="@paymentreceived" null="#(len(trim(rc.paymentreceived))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.type#" dbvarname="@type" null="#(len(trim(rc.type))?false:true)#"/>
			<cfprocresult name="eventcustomer" resultset="1"/>	
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(eventcustomer)>
		<cfreturn ls>
	</cffunction>

	<!---Add Customer to Event--->
	<cffunction name="updateCustomerToEvent" access="remote" httpMethod="POST" restPath="/customer/update/" returntype="any" produces="application/json">		
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.id = len(trim(rc.id))?rc.id:''>
		<cfset rc.eventid = len(trim(rc.eventid))?rc.eventid:''>
		<cfset rc.firstname = len(trim(rc.firstname))?rc.firstname:''>
		<cfset rc.lastname = len(trim(rc.lastname))?rc.lastname:''>
		<cfset rc.emailaddress = structKeyExists(rc,'emailaddress')?rc.emailaddress:''>
		<cfset rc.phonenumber = structKeyExists(rc,'phonenumber')?rc.phonenumber:''>
		<cfset rc.address = structKeyExists(rc,'address')?rc.address:''>
		<cfset rc.address2 = structKeyExists(rc,'address2')?rc.address2:''>
		<cfset rc.city = structKeyExists(rc,'city')?rc.city:''>
		<cfset rc.stateid = structKeyExists(rc,'stateid')?rc.stateid:''>
		<cfset rc.zipcode = structKeyExists(rc,'zipcode')?rc.zipcode:''>
		<cfset rc.jumpslogged = structKeyExists(rc,'jumpslogged')?rc.jumpslogged:''>
		<cfset rc.uspalicense = structKeyExists(rc,'uspalicense')?rc.uspalicense:''>
		<cfset rc.primarydisciplineid = structKeyExists(rc,'primarydisciplineid')?rc.primarydisciplineid:''>
		<cfset rc.homedropzoneid = structKeyExists(rc,'homedropzoneid')?rc.homedropzoneid:''>
		<cfset rc.homedropzonename = structKeyExists(rc,'homedropzonename')?rc.homedropzonename:''>
		<cfset rc.paymentreceived = structKeyExists(rc,'paymentreceived')?rc.paymentreceived:''>
		<cfset rc.type = structKeyExists(rc,'type')?rc.type:''>

		<!---Update Customer Registration--->
		<cfstoredproc procedure="sp_update_event_customer" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.id#" dbvarname="@id"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.eventid#" dbvarname="@eventid" null="#(len(trim(rc.eventid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.firstname#" dbvarname="@firstname" null="#(len(trim(rc.firstname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.lastname#" dbvarname="@lastname" null="#(len(trim(rc.lastname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.emailaddress#" dbvarname="@emailaddress" null="#(len(trim(rc.emailaddress))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.phonenumber#" dbvarname="@phonenumber" null="#(len(trim(rc.phonenumber))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address#" dbvarname="@address" null="#(len(trim(rc.address))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address2#" dbvarname="@address2" null="#(len(trim(rc.address2))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.city#" dbvarname="@city" null="#(len(trim(rc.city))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.stateid#" dbvarname="@stateid" null="#(len(trim(rc.stateid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.zipcode#" dbvarname="@zipcode" null="#(len(trim(rc.zipcode))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.jumpslogged#" dbvarname="@jumpslogged" null="#(len(trim(rc.jumpslogged))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.uspalicense#" dbvarname="@uspalicense" null="#(len(trim(rc.uspalicense))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.primarydisciplineid#" dbvarname="@primarydisciplineid" null="#(len(trim(rc.primarydisciplineid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.homedropzoneid#" dbvarname="@homedropzoneid" null="#(len(trim(rc.homedropzoneid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.homedropzonename#" dbvarname="@homedropzonename" null="#(len(trim(rc.homedropzonename))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.paymentreceived#" dbvarname="@paymentreceived" null="#(len(trim(rc.paymentreceived))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.type#" dbvarname="@type" null="#(len(trim(rc.type))?false:true)#"/>
			<cfprocresult name="eventcustomer" resultset="1"/>	
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(eventcustomer)>
		<cfreturn ls>
	</cffunction>


	<!---Get Event Customers--->
	<cffunction name="getEventCustomers" access="remote" httpMethod="GET" restPath="/customers/get/" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocresult name="customers" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(customers)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Event Customer by ID--->
	<cffunction name="getCustomerByID" access="remote" httpMethod="GET" restPath="/customers/get/{customerid}" returntype="any" produces="application/json">		
		<cfargument name="customerid" type="numeric" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#customerid#" dbvarname="@customerid"/>
			<cfprocresult name="customer" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(customer)>    
		<cfreturn ls>
	</cffunction>



	
    
</cfcomponent>