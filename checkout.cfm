


<cfset paypal = createObject("component", "paypal").init(
	 client_id = REQUEST.ClientID
	,client_secret = REQUEST.Secret
	,sandbox = REQUEST.UsePaypalSandbox)>

<cfdump var="#paypal#">

<cfset response = paypal.capture(
	 card_type = "visa"
	,card_number = "4556747948786484"
	,card_exp_month = "12"
	,card_exp_year = "2016"
	,card_firstname = "Bob"
	,card_lastname = "Smith"
	,amount = "1.25"
	,description = "Order 1001")>


<cfoutput>#response#</cfoutput>