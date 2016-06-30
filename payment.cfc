<cfcomponent rest="true" restPath="/transaction" extends="api.utility">

	<!---Get Dropzones--->
	<cffunction name="sendPayment" access="remote" httpMethod="POST" restPath="/sendPayment/" returntype="any" produces="application/json">
		<cfargument name="card_type" type="string" required="true">
		<cfargument name="card_number" type="numeric" required="true">
		<cfargument name="card_exp_month" type="numeric" required="true">
		<cfargument name="card_exp_year" type="numeric" required="true">
		<cfargument name="card_firstname" type="string" required="true">
		<cfargument name="card_lastname" type="string" required="true">
		<cfargument name="amount" type="numeric" required="true">
		<cfargument name="eventdescription" type="string" required="true">

		<!---Create Key--->
		<cfset paypal = createObject("component", "api.paypal").init(
			 client_id = REQUEST.ClientID
			,client_secret = REQUEST.Secret
			,sandbox = REQUEST.UsePaypalSandbox)>

		<!---Submit Payment--->
		<cfset response = paypal.capture(
			 card_type = ARGUMENTS.card_type
			,card_number = ARGUMENTS.card_number
			,card_exp_month = ARGUMENTS.card_exp_month
			,card_exp_year = ARGUMENTS.card_exp_year
			,card_firstname = ARGUMENTS.card_firstname
			,card_lastname = ARGUMENTS.card_lastname
			,amount = ARGUMENTS.amount
			,description = ARGUMENTS.eventdescription)>

		<cfset ls=QueryToStruct(response)>    
		<cfreturn ls>
	</cffunction>

</cfcomponent>