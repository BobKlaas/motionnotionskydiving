<!--- component with attributes rest and restpath --->
<cfcomponent rest="true"
             restpath="/test">

    <!--- handle GET request (httpmethod),
          take argument in restpath(restpath={customerID}),
          return query data in json format(produces=text/json) ---> 
    <cffunction name="getHandlerJSON"
                access="remote"
                httpmethod="GET"
                restpath="{customerID}"
                returntype="query"
                produces="application/json">
                    
        <cfargument name="customerID"
                    required="true"
                    restargsource="Path"
                    type="numeric"/>
    
        <cfset myQuery = queryNew("id,name", 
                                  "Integer,varchar",
                                  [[1, "Sagar"], [2, "Ganatra"]])>
        <cfquery dbtype="query"
                 name="resultQuery">
            select * from myQuery where id = #arguments.customerID#
        </cfquery>
        <cfreturn resultQuery>
    </cffunction>   
</cfcomponent>