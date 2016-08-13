<cfcomponent rest="true" restPath="/events" extends="api.utility">


	<!---Get All Events--->
	<cffunction name="getEvents" access="remote" httpMethod="GET" restPath="/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_events" datasource="motion">
			<cfprocresult name="events" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(events)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Events By Status--->
	<cffunction name="getEventsByStatus" access="remote" httpMethod="GET" restPath="/get/status/{active}" returntype="any" produces="application/json">		
		<cfargument name="active" type="numeric" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_events" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_BIT" value="#active#" dbvarname="@active"/>
			<cfprocresult name="events" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(events)>    
		<cfreturn ls>
	</cffunction>

	<!---Update Event Status--->
	<cffunction name="updateEventStatus" access="remote" httpMethod="POST" restPath="/update/status/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.eventid = structKeyExists(rc,'eventid')?rc.eventid:''>
		<cfset rc.status = structKeyExists(rc,'status')?rc.status:''>

		<!---Update Event Status --->
		<cfstoredproc procedure="sp_update_event_status" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.eventid#" dbvarname="@eventid"/>
			<cfprocparam cfsqltype="CF_SQL_BIT" value="#rc.status#" dbvarname="@status"/>
			<cfprocresult name="event" resultset="1">
		</cfstoredproc>

		<cfset ls=QueryToStruct(event)>    
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
			<cfprocparam cfsqltype="CF_SQL_CHAR" value="#rc.id#" dbvarname="@id"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.eventid#" dbvarname="@eventid" null="#(len(trim(rc.eventid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.firstname#" dbvarname="@firstname" null="#(len(trim(rc.firstname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.lastname#" dbvarname="@lastname" null="#(len(trim(rc.lastname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.emailaddress#" dbvarname="@emailaddress" null="#(len(trim(rc.emailaddress))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.phonenumber#" dbvarname="@phonenumber" null="#(len(trim(rc.phonenumber))?false:true)#"/>
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


	<!---Get Customers--->
	<cffunction name="getEventCustomers" access="remote" httpMethod="GET" restPath="/customers/get/" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocresult name="customers" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(customers)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Customers by Event--->
	<cffunction name="getEventCustomersByEvent" access="remote" httpMethod="GET" restPath="/customers/event/{eventid}" returntype="any" produces="application/json">
		<cfargument name="eventid" type="string" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#eventid#" dbvarname="@eventid" />
			<cfprocresult name="customers" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(customers)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Event Customer by ID--->
	<cffunction name="getCustomerByID" access="remote" httpMethod="GET" restPath="/customers/get/{customerid}" returntype="any" produces="application/json">		
		<cfargument name="customerid" type="string" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_CHAR" value="#customerid#" dbvarname="@customerid"/>
			<cfprocresult name="customer" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(customer)>    
		<cfreturn ls>
	</cffunction>


	<!---Create Event--->
	<cffunction name="createEvent" access="remote" httpMethod="POST" restPath="/create/" returntype="any" produces="application/json">		
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.title = structKeyExists(rc,'title')?rc.title:''>
		<cfset rc.description = structKeyExists(rc,'description')?rc.description:''>
		<cfset rc.startdate = structKeyExists(rc,'startdate')?rc.startdate:''>
		<cfset rc.enddate = structKeyExists(rc,'enddate')?rc.enddate:''>
		<cfset rc.slots = structKeyExists(rc,'slots')?rc.slots:''>
		<cfset rc.reserveslots = structKeyExists(rc,'reserveslots')?rc.reserveslots:''>
		<cfset rc.registrationfee = structKeyExists(rc,'registrationfee')?rc.registrationfee:''>
		<cfset rc.dropzoneid = structKeyExists(rc,'dropzoneid')?rc.dropzoneid:''>
		<cfset rc.image = structKeyExists(rc,'image')?rc.image:''>
		<cfset rc.active = structKeyExists(rc,'active')?rc.active:''>

		<!---Create Image Name--->
		<cfset imagename = REReplace(rc.title,"[^0-9A-Za-z ]","","all")>
		<cfset imagename = imagename & TimeFormat(now(),"hhmmssl") & ".png">
		<cfset imagelocation = ExpandPath('\assets\images\events\') & imagename>

		<!---Upload Image--->
		<cfset image = imageReadBase64(rc.image)>
		<cfset imageWrite(image,imagelocation,1,true)>

		<!---Add Customer to Event --->
		<cfstoredproc procedure="sp_insert_event" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.title#" dbvarname="@title"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.description#" dbvarname="@description"/>
			<cfprocparam cfsqltype="CF_SQL_TIMESTAMP" value="#rc.startdate#" dbvarname="@startdate"/>
			<cfprocparam cfsqltype="CF_SQL_TIMESTAMP" value="#rc.enddate#" dbvarname="@enddate"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.slots#" dbvarname="@slots"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.reserveslots#" dbvarname="@reserveslots"/>
			<cfprocparam cfsqltype="CF_SQL_DECIMAL" value="#rc.registrationfee#" dbvarname="@registrationfee"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.dropzoneid#" dbvarname="@dropzoneid"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.image#" dbvarname="@imagename"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.active#" dbvarname="@active"/>
			<cfprocresult name="event" resultset="1"/>	
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(event)>
		<cfreturn rc>
	</cffunction>

    
</cfcomponent>