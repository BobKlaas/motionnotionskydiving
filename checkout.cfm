<!---Setup Default ParamsList--->
<cfset rc = StructNew()>
<cfset rc.fullname = structKeyExists(rc,'fullname')?rc.fullname:'FULL NAME'>
<cfset rc.emailaddress = structKeyExists(rc,'emailaddress')?rc.emailaddress:'email@email.com'>
<cfset rc.subject = structKeyExists(rc,'subject')?rc.subject:'Subject'>
<cfset rc.message = structKeyExists(rc,'message')?reReplace(rc.message,'\n','<br />','ALL'):'Message Goes Here'>

<!---Get Email Template for Admin--->
<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
	<cfprocparam cfsqltype="CF_SQL_INTEGER" value="2" dbvarname="@templateid"/>
	<cfprocresult name="template" resultset="1">
</cfstoredproc>

<!---Send Email to Admins--->
<!--- <cfmail to="#REQUEST.AdminEmail#" from="#rc.emailaddress#" bcc="#REQUEST.AdminEmail#" subject="Event Registration Confirmed" type="html" server="#APPLICATION.mailServer#" username="#APPLICATION.mailUserName#" password="#APPLICATION.mailPassword#">
	<cfmailparam file="#REQUEST.StandardLogo#" contentid="motionnotionlogo" disposition="inline"/>
	<cfinclude template="/assets/emailtemplates/#template.templatefile#">
</cfmail> --->
<cfoutput>
	<cfinclude template="/assets/emailtemplates/noninlined/#template.templatefile#">
</cfoutput>

<!---Get Email Template for Customer--->
<cfstoredproc procedure="sp_get_email_templates" datasource="motion">
	<cfprocparam cfsqltype="CF_SQL_INTEGER" value="3" dbvarname="@templateid"/>
	<cfprocresult name="template" resultset="1">
</cfstoredproc>

<!---Send Email to Customer--->
<!--- <cfmail to="#rc.emailaddress#" from="#REQUEST.NoReplyEmail#" bcc="#REQUEST.AdminEmail#" subject="Event Registration Confirmed" type="html" server="#APPLICATION.mailServer#" username="#APPLICATION.mailUserName#" password="#APPLICATION.mailPassword#">
	<cfmailparam file="#REQUEST.StandardLogo#" contentid="motionnotionlogo" disposition="inline"/>
	<cfinclude template="/assets/emailtemplates/#template.templatefile#">
</cfmail>	 --->

<cfoutput>
	<cfinclude template="/assets/emailtemplates/noninlined/#template.templatefile#">
</cfoutput>