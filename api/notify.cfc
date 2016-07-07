
<cfcomponent rest="true" restPath="/notify" extends="api.utility">

	<!---Get US States--->
	<cffunction name="sendRegistrationComplete" access="remote" httpMethod="POST" restPath="/registrationcomplete/" returntype="void">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.customerid = structKeyExists(rc,'customerid')?rc.customerid:''>

		<!---Get Email Template--->
		<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="1" dbvarname="@templateid"/>
			<cfprocresult name="template" resultset="1">
		</cfstoredproc>

		<!---Get Customer Details--->
		<cfstoredproc procedure="sp_get_event_customers" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_CHAR" value="#rc.customerid#" dbvarname="@customerid"/>
			<cfprocresult name="customer" resultset="1">
		</cfstoredproc>

		<!---Get Event Details--->
		<cfstoredproc procedure="sp_get_event_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#customer.eventid#" dbvarname="@eventid"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="contractors" resultset="2">
			<cfprocresult name="customers" resultset="3">
		</cfstoredproc>

		<!---Build Path to Event Image--->
		<cfset eventImage = ExpandPath('/assets/images/events/')&details.imagename>

		<!---Email Event Participant--->
		<cfoutput>
			<cfmail to="#customer.emailaddress#" from="#REQUEST.AdminEmail#" bcc="#REQUEST.AdminEmail#" subject="Event Registration Confirmed" type="html" server="#APPLICATION.mailServer#" username="#APPLICATION.mailUserName#" password="#APPLICATION.mailPassword#">
				<cfmailparam file="#REQUEST.StandardLogo#" contentid="motionnotionlogo" disposition="inline"/>
				<cfmailparam file="#eventImage#" contentid="eventimage" disposition="inline"/>	
				<cfinclude template="/assets/emailtemplates/#template.templatefile#">
			</cfmail>
		</cfoutput>
	</cffunction>

</cfcomponent>