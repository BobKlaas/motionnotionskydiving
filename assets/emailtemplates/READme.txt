
Regex to find everything between cfoutput tags
***********************************************
(?s)<cfoutput(.*?)</cfoutput>


1. Build template in CFM file. 
2. All variable outputs need to be surrounded by <cfoutput>
3. Use the foundation-zurb inliner to inline the CSS
4. Escape the # in the inlined HTML file. This only needs to be for #'s between the cfoutput tags. Use the regex expression above to assist.