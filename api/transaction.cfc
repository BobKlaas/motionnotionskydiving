
<cfcomponent rest="true" restPath="/transaction" extends="api.utility">

	<!---Send Payment Request--->
	<cffunction name="sendPayment" access="remote" httpMethod="POST" restPath="/paymentrequest" returntype="any" produces="application/json">		
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.card_type = len(trim(rc.card_type))?rc.card_type:''>
		<cfset rc.card_number = len(trim(rc.card_number))?rc.card_number:''>
		<cfset rc.card_exp_month = len(trim(rc.card_exp_month))?rc.card_exp_month:''>
		<cfset rc.card_exp_year = len(trim(rc.card_exp_year))?rc.card_exp_year:''>
		<cfset rc.card_firstname = len(trim(rc.card_firstname))?rc.card_firstname:''>
		<cfset rc.card_lastname = len(trim(rc.card_lastname))?rc.card_lastname:''>
		<cfset rc.amount = len(trim(rc.amount))?rc.amount:''>
		<cfset rc.description = len(trim(rc.description))?rc.description:''>
		
		<!---Create Connection to Paypal CFC --->
		<cfset paypal = createObject("component","api.paypal").init(
				 client_id = REQUEST.ClientID
				,client_secret = REQUEST.Secret
				,sandbox = REQUEST.UsePaypalSandbox)>

		<!---Submit Payment Request --->
		<cfset response = paypal.capture(
			 card_type = trim(rc.card_type)
			,card_number = trim(rc.card_number)
			,card_exp_month = trim(rc.card_exp_month)
			,card_exp_year = trim(rc.card_exp_year)
			,card_firstname = trim(rc.card_firstname)
			,card_lastname = trim(rc.card_lastname)
			,amount = trim(rc.amount)
			,description = trim(rc.description)
		)>
		
		<cfset ls=response>    
		<cfreturn ls>
	</cffunction>

	<!---Add Customer Payment--->
	<cffunction name="addCustomerPayment" access="remote" httpMethod="POST" restPath="/payment/add" returntype="any" produces="application/json">		
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.event_customer_id = structKeyExists(rc,'event_customer_id')?rc.event_customer_id:''>
		<cfset rc.pp_id = structKeyExists(rc,'pp_id')?rc.pp_id:''>
		<cfset rc.pp_state = structKeyExists(rc,'pp_state')?rc.pp_state:''>
		<cfset rc.pp_card_type = structKeyExists(rc,'pp_card_type')?rc.pp_card_type:''>
		<cfset rc.pp_card_fname = structKeyExists(rc,'pp_card_fname')?rc.pp_card_fname:''>
		<cfset rc.pp_card_lname = structKeyExists(rc,'pp_card_lname')?rc.pp_card_lname:''>
		<cfset rc.address = structKeyExists(rc,'address')?rc.address:''>
		<cfset rc.address2 = structKeyExists(rc,'address2')?rc.address2:''>
		<cfset rc.city = structKeyExists(rc,'city')?rc.city:''>
		<cfset rc.state = structKeyExists(rc,'state')?rc.state:''>
		<cfset rc.zipcode = structKeyExists(rc,'zipcode')?rc.zipcode:''>

		<!---Add Customer Payment Record--->
		<cfstoredproc procedure="sp_add_event_customer_payment" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_CHAR" value="#rc.event_customer_id#" dbvarname="@event_customer_id" null="#(len(trim(rc.event_customer_id))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.pp_id#" dbvarname="@pp_id" null="#(len(trim(rc.pp_id))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.pp_state#" dbvarname="@pp_state" null="#(len(trim(rc.pp_state))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.pp_card_type#" dbvarname="@pp_card_type" null="#(len(trim(rc.pp_card_type))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.pp_card_fname#" dbvarname="@pp_card_fname" null="#(len(trim(rc.pp_card_fname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.pp_card_lname#" dbvarname="@pp_card_lname" null="#(len(trim(rc.pp_card_lname))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address#" dbvarname="@address" null="#(len(trim(rc.address))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address2#" dbvarname="@address2" null="#(len(trim(rc.address2))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.city#" dbvarname="@city" null="#(len(trim(rc.city))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.state#" dbvarname="@state" null="#(len(trim(rc.state))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.zipcode#" dbvarname="@zipcode" null="#(len(trim(rc.zipcode))?false:true)#"/>
			<cfprocresult name="customerpayment" resultset="1"/>	
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(customerpayment)>
		<cfreturn ls>
	</cffunction>


	<!---Send an Email Confirmation to event registeree--->
	<cffunction name="sendConfirmation" access="remote" httpMethod="POST" restPath="/confirmation/send/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.event_customer_id = structKeyExists(rc,'event_customer_id')?rc.event_customer_id:''>

		<!---Get Email Template--->
		<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="1" dbvarname="@templateid"/>
			<cfprocresult name="template" resultset="1">
		</cfstoredproc>

		<!---Get Customer Details--->
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_CHAR" value="#rc.event_customer_id#" dbvarname="@customerid"/>
			<cfprocresult name="customer" resultset="1">
		</cfstoredproc>

		<!---Get Event Details--->
		<cfstoredproc procedure="sp_get_event_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#customer.eventid#" dbvarname="@eventid"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="contractors" resultset="2">
			<cfprocresult name="customers" resultset="3">
		</cfstoredproc>

		<!---Send Email--->
		<cfmail from="robertklaas@motionnotionskydiving.com" to="#customer.emailaddress#" subject="Event Registration Confirmed">
			#template.templatehtml#
		</cfmail>

		<cfreturn 'Email Send Successfully'>
	</cffunction>

</cfcomponent>