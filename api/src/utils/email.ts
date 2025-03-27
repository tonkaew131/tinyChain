export const generateResetPasswordEmail = (name: string, url: string) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://img2.pic.in.th/pic/logo078faf6053c02fff.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body
    style='background-color:#ffffff;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'>
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      A fine-grained personal access token has been added to your account
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:480px;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td>
            <img
              alt="Github"
              height="32"
              src="https://img2.pic.in.th/pic/logo078faf6053c02fff.png"
              style="display:block;outline:none;border:none;text-decoration:none"
              width="63.2140350877193" />
            <p
              style="font-size:24px;line-height:1.25;margin-bottom:16px;margin-top:16px">
              <strong>${name}</strong>, reset your password
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding:24px;border:solid 1px #dedede;border-radius:5px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:14px;line-height:24px;margin-bottom:16px;margin-top:16px;margin:0 0 10px 0;text-align:left">
                      Hey <strong>${name}</strong>!
                    </p>
                    <p
                      style="font-size:14px;line-height:24px;margin-bottom:16px;margin-top:16px;margin:0 0 10px 0;text-align:left">
                      Someone recently requested a password change for your AkaraCarbon account. If this was you, you can set a new password here:
                    </p>
                    <a
                      style="line-height:1.5;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;font-size:14px;background-color:#28a745;color:#fff;border-radius:0.5em;padding:12px 24px 12px 24px"
                      target="_blank"
                      href="${url}"
                      ><span
                        ><!--[if mso]><i style="mso-font-width:400%;mso-text-raise:18" hidden>&#8202;&#8202;&#8202;</i><![endif]--></span
                      ><span
                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
                        >Reset password</span
                      ><span
                        ><!--[if mso]><i style="mso-font-width:400%" hidden>&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span
                      ></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:14px;line-height:24px;margin-bottom:16px;margin-top:16px;text-align:center">
              <a
                style="color:#0366d6;text-decoration-line:none;font-size:12px"
                target="_blank"
                >Your security audit log</a
              >
              ・<!-- -->
              <a
                style="color:#0366d6;text-decoration-line:none;font-size:12px"
                target="_blank"
                >Contact support</a
              >
            </p>
            <p
              style="font-size:12px;line-height:24px;margin-bottom:16px;margin-top:60px;color:#6a737d;text-align:center">
              GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA
              94107
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
};
