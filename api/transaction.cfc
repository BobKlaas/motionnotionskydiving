
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

</cfcomponent>