<cfcomponent rest="true" restPath="/contractors" extends="api.utility">

	<!---Get All Contractors --->
	<cffunction name="getContractors" access="remote" httpMethod="GET" restPath="/get" returntype="any" produces="application/json">		
		<cfquery name="qryGetContractors" datasource="motion">
			SELECT 
				 c.id
				,c.firstname
				,c.lastname
				,c.emailaddress
				,c.phonenumber
				,c.uspalicenseno
				,c.uspamemberno
				,c.imagename
				,ct.title
				,c.active
				,cp.instagramurl
				,cp.facebookurl
				,cp.linkedinurl
				,cp.videourl
				,contractorSkillsTitle=(SELECT dbo.getContractorsSkillTitle(c.id))
			FROM 
				 contractors c
				 LEFT JOIN contractor_title ct ON ct.id = c.title_id
				 LEFT JOIN contractor_profile cp ON c.id = cp.contractorid
			WHERE
				 active=1
			ORDER BY 
				 lastname ASC
		</cfquery>
		<cfset ls=QueryToStruct(qryGetContractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Contractor Details --->
	<cffunction name="getContractorDetails" access="remote" httpMethod="GET" restPath="/get/{contractorid}" returntype="struct" produces="application/json">		
		<cfargument name="contractorid" type="numeric" required="true" restargsource="path">
		<cfstoredproc procedure="sp_get_contractor_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#contractorid#" dbvarname="@contractorid"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="skills" resultset="2">
			<cfprocresult name="ratings" resultset="3">		
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset contractor = structNew()>
		<cfset contractor.details = details>
		<cfset contractor.skills = skills>
		<cfset contractor.ratings = ratings>
		<cfreturn contractor>
	</cffunction>
	    
</cfcomponent>