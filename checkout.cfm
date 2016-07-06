


<cfset ICSContent = "">
<cfset ICSContent = ICSContent & "BEGIN:VCALENDAR#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "VERSION:2.0#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "CALSCALE:GREGORIAN#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "PRODID:Coldfusion8#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "BEGIN:VEVENT#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "UID:#eventItem.getEvent_id()#@extension.unh.edu#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "SUMMARY:#eventItem.getTitle()##chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "DESCRIPTION:http://extension.unh.edu/events/index.cfm?e=app.event&event_id=#eventItem.getEvent_id()##chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "DTSTART:#DateFormat(DateAdd('h',timeInfo.utcHourOffset,eventItem.getGmt_start()),"yyyymmdd")#T#TimeFormat(DateAdd('h',timeInfo.utcHourOffset,eventItem.getGmt_start()),"HHmmss")#Z#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "DTEND:#DateFormat(DateAdd('h',timeInfo.utcHourOffset,eventItem.getGmt_end()),"yyyymmdd")#T#TimeFormat(DateAdd('h',timeInfo.utcHourOffset,eventItem.getGmt_end()),"HHmmss")#Z#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "DTSTAMP:#DateFormat(DateAdd('h',timeInfo.utcHourOffset,Now()),"yyyymmdd")#T#TimeFormat(DateAdd('h',timeInfo.utcHourOffset,Now()),"HHmmss")#Z#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "END:VEVENT#chr(13)##chr(10)#">
<cfset ICSContent = ICSContent & "END:VCALENDAR">
<cfheader name="Content-Type" value="text/calendar">
<cfheader name="Content-Disposition" value="attachment; filename=UNHCEevent#DateFormat(eventItem.getGmt_start(),"yyyymmdd")#.ics">
<cfoutput>#ICSContent#</cfoutput>