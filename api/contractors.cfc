<cfcomponent rest="true" restPath="/contractors" extends="api.utility">

	<!---Get All Contractors --->
	<cffunction name="getContractors" access="remote" httpMethod="GET" restPath="/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractors" datasource="motion">
			<cfprocresult name="contractors" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(contractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get All Active Contractors --->
	<cffunction name="getActiveContractors" access="remote" httpMethod="GET" restPath="/get/active" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractors" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_BIT" value="1" dbvarname="@active"/>
			<cfprocresult name="contractors" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(contractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Contractor Roles--->
	<cffunction name="getContractorRoles" access="remote" httpMethod="GET" restPath="/roles/get" returntype="any" produces="application/json">		
		<cfstoredproc procedure="sp_get_contractor_roles" datasource="motion">
			<cfprocresult name="contractors" resultset="1">
		</cfstoredproc>
		<cfset ls=QueryToStruct(contractors)>    
		<cfreturn ls>
	</cffunction>

	<!---Get Contractor Details --->
	<cffunction name="getContractorByUniqueName" access="remote" httpMethod="GET" restPath="/get/{uniquename}" returntype="any" produces="application/json">
		<cfargument name="uniquename" type="string" required="true" restargsource="path">

		<cfstoredproc procedure="sp_get_contractor_details" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#uniquename#" dbvarname="@uniquename"/>
			<cfprocresult name="details" resultset="1">
			<cfprocresult name="skills" resultset="2">
			<cfprocresult name="ratings" resultset="3">		
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset contractor = structNew()>
		<cfset contractor.details = QueryToStruct(details)>
		<cfset contractor.skills = QueryToStruct(skills)>
		<cfset contractor.ratings = QueryToStruct(ratings)>
		<cfset JSONReturn = SerializeJSON(contractor)>
		<cfreturn JSONReturn>
	</cffunction>


	<!---Update Contractor Status--->
	<cffunction name="updateContractorStatus" access="remote" httpMethod="POST" restPath="/update/status/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.contractorid = structKeyExists(rc,'contractorid')?rc.contractorid:''>
		<cfset rc.status = structKeyExists(rc,'status')?rc.status:''>

		<!---Update Contractor Status --->
		<cfstoredproc procedure="sp_update_contractor_status" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid"/>
			<cfprocparam cfsqltype="CF_SQL_BIT" value="#rc.status#" dbvarname="@status"/>
			<cfprocresult name="contractor" resultset="1">
		</cfstoredproc>

		<cfset ls=QueryToStruct(contractor)>    
		<cfreturn ls>
	</cffunction>



	<!---Get Contractor Media --->
	<cffunction name="getContractorMedia" access="remote" httpMethod="GET" restPath="/media/{contractorid}" returntype="any" produces="application/json">
		<cfargument name="contractorid" type="string" required="true" restargsource="path">
		
		<cfstoredproc procedure="sp_get_media_by_contractor" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#arguments.contractorid#" dbvarname="@contractorid"/>
			<cfprocresult name="media" resultset="1">
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls = QueryToStruct(media)>
		<cfreturn ls>
	</cffunction>
	    
	<!---Insert Contractor Event Status--->
	<cffunction name="createContractor" access="remote" httpMethod="POST" restPath="/create/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.firstname = structKeyExists(rc,"firstname")?rc.firstname:''>
		<cfset rc.lastname = structKeyExists(rc,"lastname")?rc.lastname:''>
		<cfset rc.emailaddress = structKeyExists(rc,"emailaddress")?rc.emailaddress:''>
		<cfset rc.phonenumber = structKeyExists(rc,"phonenumber")?rc.phonenumber:''>
		<cfset rc.uspalicenseno = structKeyExists(rc,"uspalicenseno")?rc.uspalicenseno:''>
		<cfset rc.uspamemberno = structKeyExists(rc,"uspamemberno")?rc.uspamemberno:''>
		<cfset rc.imagename = structKeyExists(rc,"imagename")?rc.imagename:''>
		<cfset rc.homedropzoneid = structKeyExists(rc,"homedropzoneid")?rc.homedropzoneid:''>
		<cfset rc.homedropzonename = structKeyExists(rc,"homedropzonename")?rc.homedropzonename:''>
		<cfset rc.address1 = structKeyExists(rc,"address1")?rc.address1:''>
		<cfset rc.address2 = structKeyExists(rc,"address2")?rc.address2:''>
		<cfset rc.city = structKeyExists(rc,"city")?rc.city:''>
		<cfset rc.stateid = structKeyExists(rc,"stateid")?rc.stateid:''>
		<cfset rc.zipcode = structKeyExists(rc,"zipcode")?rc.zipcode:''>
		<cfset rc.active = structKeyExists(rc,"active")?rc.active:0>

		<!---Create Image Name--->
		<cfset newImageName = "#rc.firstname##rc.lastname#">
		<cfset newImageName = REReplace(newImageName,"[^0-9A-Za-z ]","","all")>
		<cfset newImageName = newImageName & TimeFormat(now(),"hhmmssl") & ".png">
		<cfset imagelocation = ExpandPath('\assets\images\contractors\') & newImageName>

		<!---Upload Image--->
		<cfset image = imageReadBase64(rc.imagename)>
		<cfset imageWrite(image,imagelocation,1,true)>

		<!---Create Contractor--->
		<cfstoredproc procedure="sp_insert_contractor" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.firstname#" dbvarname="@firstname"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.lastname#" dbvarname="@lastname"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.emailaddress#" dbvarname="@emailaddress" null="#(len(trim(rc.emailaddress))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.phonenumber#" dbvarname="@phonenumber" null="#(len(trim(rc.phonenumber))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.uspalicenseno#" dbvarname="@uspalicenseno" null="#(len(trim(rc.uspalicenseno))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.uspamemberno#" dbvarname="@uspamemberno" null="#(len(trim(rc.uspamemberno))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#newImageName#" dbvarname="@imagename" null="#(len(trim(rc.imagename))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.homedropzoneid#" dbvarname="@homedropzoneid" null="#(len(trim(rc.homedropzoneid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.homedropzonename#" dbvarname="@homedropzonename" null="#(len(trim(rc.homedropzonename))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address1#" dbvarname="@address1" null="#(len(trim(rc.address1))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address2#" dbvarname="@address2" null="#(len(trim(rc.address2))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.city#" dbvarname="@city" null="#(len(trim(rc.city))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.zipcode#" dbvarname="@zipcode" null="#(len(trim(rc.zipcode))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.stateid#" dbvarname="@stateid" null="#(len(trim(rc.stateid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_BIT" value="#rc.active#" dbvarname="@active" null="#(len(trim(rc.active))?false:true)#"/>
			<cfprocresult name="contractor" resultset="1"/>
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(contractor)>
		<cfreturn ls>
	</cffunction>

	<!---Update Contractor--->
	<cffunction name="updateContractor" access="remote" httpMethod="POST" restPath="/update/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.id = structKeyExists(rc,"id")?rc.id:''>
		<cfset rc.firstname = structKeyExists(rc,"firstname")?rc.firstname:''>
		<cfset rc.lastname = structKeyExists(rc,"lastname")?rc.lastname:''>
		<cfset rc.emailaddress = structKeyExists(rc,"emailaddress")?rc.emailaddress:''>
		<cfset rc.phonenumber = structKeyExists(rc,"phonenumber")?rc.phonenumber:''>
		<cfset rc.uspalicenseno = structKeyExists(rc,"uspalicenseno")?rc.uspalicenseno:''>
		<cfset rc.uspamemberno = structKeyExists(rc,"uspamemberno")?rc.uspamemberno:''>
		<cfset rc.imagename = structKeyExists(rc,"imagename")?rc.imagename:''>
		<cfset rc.homedropzoneid = structKeyExists(rc,"homedropzoneid")?rc.homedropzoneid:''>
		<cfset rc.homedropzonename = structKeyExists(rc,"homedropzonename")?rc.homedropzonename:''>
		<cfset rc.address1 = structKeyExists(rc,"address1")?rc.address1:''>
		<cfset rc.address2 = structKeyExists(rc,"address2")?rc.address2:''>
		<cfset rc.city = structKeyExists(rc,"city")?rc.city:''>
		<cfset rc.stateid = structKeyExists(rc,"stateid")?rc.stateid:''>
		<cfset rc.zipcode = structKeyExists(rc,"zipcode")?rc.zipcode:''>
		<cfset rc.active = structKeyExists(rc,"active")?rc.active:0>

		<!---Get Event Image--->
		<cfquery name="qryContractor" datasource="motion">
			SELECT imagename FROM contractors WHERE id=<cfqueryparam cfsqltype="CF_SQL_INTEGER" value="#rc.id#" />
		</cfquery>

		<!---Create Image Name--->
		<cftry>
			<cfset newImageName = ''>
			<cfif len(trim(rc.imagename))>
				<!---Create Image Name--->
				<cfset newImageName = "#rc.firstname##rc.lastname#">
				<cfset newImageName = REReplace(newImageName,"[^0-9A-Za-z ]","","all")>
				<cfset newImageName = newImageName & TimeFormat(now(),"hhmmssl") & ".png">
				<cfset imagelocation = ExpandPath('\assets\images\contractors\') & newImageName>

				<!---Upload Image--->
				<cfset image = imageReadBase64(rc.imagename)>
				<cfset imageWrite(image,imagelocation,1,true)>

				<!---Delete Old Image--->
				<cfif len(trim(qryContractor.imagename)) AND fileExists(ExpandPath('\assets\images\contractors\') & qryContractor.imagename)>
					<cfset fileDelete(ExpandPath('\assets\images\contractors\') & qryContractor.imagename)>
				</cfif>
			</cfif>
			<cfcatch></cfcatch>
		</cftry>

		<!---Update Contractor--->
		<cfstoredproc procedure="sp_update_contractor" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.id#" dbvarname="@contractorid"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.firstname#" dbvarname="@firstname"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.lastname#" dbvarname="@lastname"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.emailaddress#" dbvarname="@emailaddress" null="#(len(trim(rc.emailaddress))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.phonenumber#" dbvarname="@phonenumber" null="#(len(trim(rc.phonenumber))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.uspalicenseno#" dbvarname="@uspalicenseno" null="#(len(trim(rc.uspalicenseno))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.uspamemberno#" dbvarname="@uspamemberno" null="#(len(trim(rc.uspamemberno))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#newImageName#" dbvarname="@imagename" null="#(len(trim(newImageName))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.homedropzoneid#" dbvarname="@homedropzoneid" null="#(len(trim(rc.homedropzoneid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.homedropzonename#" dbvarname="@homedropzonename" null="#(len(trim(rc.homedropzonename))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address1#" dbvarname="@address1" null="#(len(trim(rc.address1))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.address2#" dbvarname="@address2" null="#(len(trim(rc.address2))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.city#" dbvarname="@city" null="#(len(trim(rc.city))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.zipcode#" dbvarname="@zipcode" null="#(len(trim(rc.zipcode))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.stateid#" dbvarname="@stateid" null="#(len(trim(rc.stateid))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_BIT" value="#rc.active#" dbvarname="@active" null="#(len(trim(rc.active))?false:true)#"/>
			<cfprocresult name="contractor" resultset="1"/>
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(contractor)>
		<cfreturn ls>
	</cffunction>


	<!---Update Contractor Profile--->
	<cffunction name="updateContractorProfile" access="remote" httpMethod="POST" restPath="/profile/update" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.profileid = structKeyExists(rc,"profileid")?rc.profileid:''>
		<cfset rc.contractorid = structKeyExists(rc,"contractorid")?rc.contractorid:''>
		<cfset rc.instagramurl = structKeyExists(rc,"instagramurl")?rc.instagramurl:''>
		<cfset rc.facebookurl = structKeyExists(rc,"facebookurl")?rc.facebookurl:''>
		<cfset rc.linkedinurl = structKeyExists(rc,"linkedinurl")?rc.linkedinurl:''>
		<cfset rc.videourl = structKeyExists(rc,"videourl")?rc.videourl:''>
		<cfset rc.blurb = structKeyExists(rc,"blurb")?rc.blurb:''>
		<cfset rc.dayrate = structKeyExists(rc,"dayrate")?rc.dayrate:''>
		
		<!---Update Contractor Profile--->
		<cfstoredproc procedure="sp_update_contractor_profile" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.profileid#" dbvarname="@profileid" />
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid" />
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.instagramurl#" maxlength="150" dbvarname="@instagramurl" null="#(len(trim(rc.instagramurl))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.facebookurl#" maxlength="150" dbvarname="@facebookurl" null="#(len(trim(rc.facebookurl))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.linkedinurl#" maxlength="150" dbvarname="@linkedinurl" null="#(len(trim(rc.linkedinurl))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.videourl#" maxlength="150" dbvarname="@videourl" null="#(len(trim(rc.videourl))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#rc.blurb#" maxlength="1000" dbvarname="@blurb" null="#(len(trim(rc.blurb))?false:true)#"/>
			<cfprocparam cfsqltype="CF_SQL_DECIMAL" value="#rc.dayrate#" scale="2" dbvarname="@dayrate" null="#(len(trim(rc.dayrate))?false:true)#"/>
			<cfprocresult name="contractor" resultset="1"/>
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(contractor)>
		<cfreturn ls>
	</cffunction>


	<!---Update Contractor Skills--->
	<cffunction name="saveEventContractors" access="remote" httpMethod="POST" restPath="/skills/update/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>
			
		<cfset rc1 = deserializeJSON(ARGUMENTS.params)>
		<cfset skillList = ''>

		<cfloop array="#rc1#" index="i">
			<cfset rc2 = i>
			<cfset rc.contractorid = structKeyExists(rc2,"contractorid")?rc2.contractorid:''>	
			<cfset rc.skillid = structKeyExists(rc2,"skillid")?rc2.skillid:''>
			<cfset rc.levelid = structKeyExists(rc2,"levelid")?rc2.levelid:''>
			<cfset rc.active = structKeyExists(rc2,"active")?rc2.active:1>
			
			<!---Add Skill ID to List--->
			<cfset skillList = listAppend(skillList,rc.skillid)>

			<!---Update Contractor Skill--->
			<cfstoredproc procedure="sp_update_contractor_skill" datasource="motion">
				<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid" null="#(len(trim(rc.contractorid))?false:true)#"/>
				<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.skillid#" dbvarname="@skillid" null="#(len(trim(rc.skillid))?false:true)#"/>
				<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.levelid#" dbvarname="@levelid" null="#(len(trim(rc.levelid))?false:true)#"/>
				<cfprocparam cfsqltype="CF_SQL_BIT" value="#rc.active#" dbvarname="@active" null="#(len(trim(rc.active))?false:true)#"/>
			</cfstoredproc>
		</cfloop>

		<!--- Delete Skills by SkillID and Contractor that are NOT in skillList--->
		<cfif len(trim(rc.contractorid))>
			<cfquery name="qryDeleteContractor" datasource="motion">
				DELETE FROM contractor_skills 
				WHERE 
					contractor_id = <cfqueryparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#"/>
					<cfif listLen(skillList)>
						AND skill_id NOT IN (<cfqueryparam cfsqltype="CF_SQL_INTEGER" value="#skillList#" list="true">)
					</cfif>
			</cfquery>
		</cfif>
	</cffunction>


	<!---Get Contractor Skills--->
	<cffunction name="getContractorSkills" access="remote" httpMethod="POST" restPath="/skills/get/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.contractorid = structKeyExists(rc,"contractorid")?rc.contractorid:''>
		
		<!---Get Contractor Skills--->
		<cfstoredproc procedure="sp_get_contractor_skills" datasource="motion">
			<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid" />
			<cfprocresult name="contractor" resultset="1"/>
		</cfstoredproc>

		<!---Create Structure From Results--->
		<cfset ls=QueryToStruct(contractor)>
		<cfreturn ls>
	</cffunction>


	<!---Update Contractor Ratings--->
	<cffunction name="updateContractorRatings" access="remote" httpMethod="POST" restPath="/ratings/update/" returntype="any" produces="application/json">
		<cfargument name="params" type="string" required="true" argtype="pathparam"/>
		<cfset ratingList = ''>

		<!---Setup Default ParamsList--->
		<cfset rc = deserializeJSON(ARGUMENTS.params)>
		<cfset rc.contractorid = structKeyExists(rc,"contractorid")?rc.contractorid:''>
		<cfset rc.ratings = structKeyExists(rc,"ratings")?rc.ratings:''>
		
		<!---Update Contractor Ratings--->
		<cfif listLen(rc.ratings)>			
			<cfloop list="#rc.ratings#" delimiters="," index="i">
				<cfset ratingList = listAppend(ratingList,i)>
				<cfstoredproc procedure="sp_update_contractor_rating" datasource="motion">
					<cfprocparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#" dbvarname="@contractorid" />
					<cfprocparam cfsqltype="CF_SQL_VARCHAR" value="#i#" dbvarname="@ratingid" />
				</cfstoredproc>
			</cfloop>
		</cfif>

		<!--- Delete Skills by SkillID and Contractor that are NOT in skillList--->
		<cfif len(trim(rc.contractorid))>
			<cfquery name="qryDeleteContractor" datasource="motion">
				DELETE FROM contractor_ratings 
				WHERE 
					contractor_id = <cfqueryparam cfsqltype="CF_SQL_INTEGER" value="#rc.contractorid#"/>
					<cfif listLen(ratingList)>
						AND rating_id NOT IN (<cfqueryparam cfsqltype="CF_SQL_INTEGER" value="#ratingList#" list="true">)
					</cfif>
			</cfquery>
		</cfif>
	</cffunction> 

	   
	    
</cfcomponent>