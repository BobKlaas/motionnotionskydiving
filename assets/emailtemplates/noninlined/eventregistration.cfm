<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Title</title>
    <link rel="stylesheet" href="/assets/css/foundation-emails.css"> </head>

  <body>
    <!-- <style> -->
    <table class="body" data-made-with-foundation="">
      <tr>
        <td class="float-center" align="center" valign="top">
          <center data-parsed="">
            <style type="text/css" align="center" class="float-center">
              .header {
                background: #8a8a8a;
              }
              
              .header .columns {
                padding-bottom: 0;
              }
              
              .header p {
                color: #fff;
                padding-top: 15px;
              }
              
              .header .wrapper-inner {
                padding: 20px;
              }
              
              .header .container {
                background: transparent;
              }
              
              table.button.facebook table td {
                background: #3B5998 !important;
                border-color: #3B5998;
              }
              
              table.button.twitter table td {
                background: #1daced !important;
                border-color: #1daced;
              }
              
              table.button.google table td {
                background: #DB4A39 !important;
                border-color: #DB4A39;
              }
              
              .wrapper.secondary {
                background: #f3f3f3;
              }
            </style>
            <table align="center" class="wrapper header float-center">
              <tr>
                <td class="wrapper-inner">
                  <table align="center" class="container">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row collapse">
                            <tbody>
                              <tr>
                                <th class="small-6 large-6 columns first">
                                  <table>
                                    <tr>
                                      <th><img src="cid:motionnotionlogo"></th>
                                    </tr>
                                  </table>
                                </th>
                                <th class="small-6 large-6 columns last">
                                  <table>
                                    <tr>
                                      <th>
                                        <p class="text-right"></p>
                                      </th>
                                    </tr>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" class="container float-center">
              <tbody>
                <tr>
                  <td>
                    <table class="spacer">
                      <tbody>
                        <tr>
                          <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="row">
                      <tbody>
                        <tr>
                          <th class="small-12 large-12 columns first last">
                            <table>
                              <tr>
                                <th>
                                  <h1>Hi, #customer.firstname#</h1>
                                  <p>Thank you for registering for the #details.title#. Below are the event details along with a link to our cancellation/weather policy. Take a minute to check it out. We look forward to seeing you at the camp!</p> 
                                  <p><i>-The Motion Notion Team</i></p>
                                  <img src="cid:eventimage" alt=""><br>                                
                                  <p>Location: #details.dropzonename# | #details.address#, #details.city# #details.state# #details.zipcode#</p>
                                  <p>Start Date: #DateFormat(details.enddate,'mm/dd/yyyy')#</p>                                  
                                  <p>Start Time: #TimeFormat(details.statdate, 'h:mm tt')#</p>
                                  <p>Cancellation/Weather Policy: <a href="https://motionnotionskydiving.com/event/policies/">Click Here</a></p>
                                </th>
                                <th class="expander"></th>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <table class="wrapper secondary" align="center">
                      <tr>
                        <td class="wrapper-inner">
                          <table class="spacer">
                            <tbody>
                              <tr>
                                <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                              </tr>
                            </tbody>
                          </table>
                          <table class="row">
                            <tbody>
                              <tr>
                                <th class="small-12 large-6 columns first">
                                  <table>
                                    <tr>
                                      <th>
                                        <h5>Connect With Us:</h5>
                                        <table class="button facebook expand">
                                          <tr>
                                            <td>
                                              <table>
                                                <tr>
                                                  <td>
                                                    <center data-parsed=""><a href="https://www.facebook.com/Motion-Notion-997550893655135/" align="center" class="float-center">Facebook</a></center>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td class="expander"></td>
                                          </tr>
                                        </table>
                                        <table class="button twitter expand">
                                          <tr>
                                            <td>
                                              <table>
                                                <tr>
                                                  <td>
                                                    <center data-parsed=""><a href="https://www.instagram.com/motionnotionskydiving/" align="center" class="float-center">Instagram</a></center>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td class="expander"></td>
                                          </tr>
                                        </table>
                                        <table class="button google expand">
                                          <tr>
                                            <td>
                                              <table>
                                                <tr>
                                                  <td>
                                                    <center data-parsed=""><a href="#APPLICATION.SecureHostName#" align="center" class="float-center">Our Website</a></center>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td class="expander"></td>
                                          </tr>
                                        </table>
                                      </th>
                                    </tr>
                                  </table>
                                </th>
                                <th class="small-12 large-6 columns last">
                                  <table>
                                    <tr>
                                      <th>
                                        <h5>Contact Info:</h5>
                                        <p>Email: <a href="mailto:#REQUEST.AdminEmail#">#REQUEST.AdminEmail#</a></p>
                                      </th>
                                    </tr>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <center data-parsed="">
                      <table align="center" class="menu float-center">
                        <tr>
                          <td>
                            <table>
                              <tr>
                                <th class="menu-item float-center"><a href="https://motionnotionskydiving.com/terms/">Terms</a></th>
                                <th class="menu-item float-center"><a href="https://motionnotionskydiving.com/privacy/">Privacy</a></th>
                                <th class="menu-item float-center"><a href="https://motionnotionskydiving.com/unsubscribe/">Unsubscribe</a></th>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </td>
      </tr>
    </table>
  </body>

</html>