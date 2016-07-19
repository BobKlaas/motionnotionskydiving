<!---Setup Default ParamsList--->
<cfset rc = StructNew()>
<cfset rc.fullname = structKeyExists(rc,'fullname')?rc.fullname:'FULL NAME'>
<cfset rc.emailaddress = structKeyExists(rc,'emailaddress')?rc.emailaddress:'email@email.com'>
<cfset rc.subject = structKeyExists(rc,'subject')?rc.subject:'Subject'>
<cfset rc.message = structKeyExists(rc,'message')?reReplace(rc.message,'\n','<br />','ALL'):'Message Goes Here'>

<!---Set Template ID--->
<cfset template = isDefined('url.templateid')?url.templateid:3>

<!---Use Inlined vs. Non Inlined Template--->
<cfif isDefined('url.inlined') AND url.inlined EQ 1>
	<cfset templateFolder = 'assets/emailtemplates/'>
<cfelse>
	<cfset templateFolder = 'assets/emailtemplates/noninlined/'>
</cfif>


<cfswitch expression="#template#">

	<!---Event Registration Email________________________________--->
	<cfcase value="1">
		<cfquery name="qryGetCustomerID" datasource="motion">
			SELECT TOP 1 id FROM event_customers
		</cfquery>

		<!---Get Customer Details--->
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_CHAR" value="#qryGetCustomerID.id#" dbvarname="@customerid"/>
			<cfprocresult name="customer" resultset="1">
		</cfstoredproc>

		<!---Get Event Details--->
		<cfstoredproc procedure="sp_get_event_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#customer.eventid#" dbvarname="@eventid"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="contractors" resultset="2">
			<cfprocresult name="customers" resultset="3">
		</cfstoredproc>

		<!---Get Email Template for Admin--->
		<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="1" dbvarname="@templateid"/>
			<cfprocresult name="template" resultset="1">
		</cfstoredproc>
		<cfoutput><cfinclude template="#templateFolder##template.templatefile#"></cfoutput>		
	</cfcase>

	<!---Contact: Admin Version________________________________--->
	<cfcase value="2">
		<!---Get Email Template for Admin Contact Email--->
		<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="2" dbvarname="@templateid"/>
			<cfprocresult name="template" resultset="1">
		</cfstoredproc>
		<cfoutput><cfinclude template="#templateFolder##template.templatefile#"></cfoutput>
	</cfcase>

	<!---Contact: Customer Version________________________________--->
	<cfcase value="3">
		<!---Get Email Template for User Contact Email--->
		<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="3" dbvarname="@templateid"/>
			<cfprocresult name="template" resultset="1">
		</cfstoredproc>
		<cfoutput><cfinclude template="#templateFolder##template.templatefile#"></cfoutput>
	</cfcase>
</cfswitch>