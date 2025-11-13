import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface EmailData {
  email: string;
}

export async function sendWelcomeEmail(emailData: EmailData): Promise<boolean> {
  const { email } = emailData;
  
  try {
    // Validate email
    if (!email || !email.includes('@')) {
      return false;
    }

    // Email template
    const subject = `Welcome to Nation One Debt Relief - Your Journey Starts Now!`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Nation One Debt Relief</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            text-align: center;
          }
          .email-container {
            max-width: 600px;
            width: 100%;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border: 1px solid #e8e8e8;
            overflow: hidden;
          }
          .email-wrapper {
            background-color: #f8f9fa;
            padding: 20px;
          }
          table {
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            border-collapse: collapse;
            margin: 0 auto;
          }
          td {
            padding: 0;
            text-align: center;
            vertical-align: top;
          }
          img {
            border: 0;
            max-width: 100%;
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .footer-text {
            padding: 20px;
            font-size: 12px;
            color: #666;
            line-height: 1.5;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          .footer-text p {
            margin: 8px 0;
            text-align: center;
          }
          .footer-text a {
            color: #dc2626;
            text-decoration: none;
          }
          .footer-text a:hover {
            text-decoration: underline;
          }
          @media only screen and (max-width: 600px) {
            .email-wrapper {
              padding: 10px;
            }
            .email-container {
              margin: 0;
              border-radius: 8px;
            }
            .footer-text {
              padding: 15px;
              font-size: 11px;
            }
          }
          @media only screen and (max-width: 480px) {
            .email-wrapper {
              padding: 5px;
            }
            .email-container {
              margin: 0;
              border-radius: 6px;
            }
            .footer-text {
              padding: 12px;
              font-size: 10px;
            }
          }
        </style>
      </head>
        <body>
          <div class="email-wrapper">
            <div class="email-container">
              <table>
              <tr>
                <td>
                  <img src="https://www.nationonedebtrelief.com/email/content-1.png" alt="content">
                </td>
              </tr>
              <tr>
                <td>
                  <a href="tel:+18664951543"><img src="https://www.nationonedebtrelief.com/email/cta.png" alt="cta"></a>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="https://www.nationonedebtrelief.com/email/content-3.png" alt="content">
                </td>
              </tr>
              <tr>
                <td class="footer-text">
                  <p>This is an automated confirmation to let you know we've received your request. If you want to stop receiving these emails, you can unsubscribe by visiting our website and clicking <a href="https://www.hatsaltfolder.com/o-bflc-u47-530cb734b9a5090d7b137afe8d0836be">here</a></p>
                </td>
              </tr>
              <tr>
                <td class="footer-text">
                  <p><a href="https://www.nationonedebtrelief.com">nationonedebtrelief.com</a> | 12540 SW Leveton Dr, #P2150 Tualatin, OR, 97062</p>
                </td>
              </tr>
            </table>
            </div>
          </div>
        </body>
      </html>
    `;

    const textBody = `
Thank you for signing up with Nation One Debt Relief

You've been successfully matched with Nation One Debt Relief.

A debt relief specialist will be contacting you soon.

If you'd like to speak with a specialist right away, you can call:
1-(866)-495-1543
Call Center Hours: 8am - 8pm EST

KEY FACTS ABOUT NATIONAL DEBT RELIEF, LLC:
✅ No upfront fees — you pay only after a settlement is reached.
✅ Fees are typically up to 25% of the enrolled debt.
✅ Applicants usually must have at least $7,500 in unsecured debt to qualify.
✅ Service is limited to unsecured debts (credit cards, personal loans, etc.), not secured debts.
✅ You make monthly deposits into a dedicated account, which NDR uses to fund settlements.
✅ The program typically lasts 24-48 months, depending on your debt and payments.
✅ National Debt Relief holds an A+ rating with the Better Business Bureau.

---
This is an automated confirmation to let you know we've received your request.
If you want to stop receiving these emails, you can unsubscribe by visiting our website and clicking here: https://www.hatsaltfolder.com/o-bflc-u47-530cb734b9a5090d7b137afe8d0836be

nationonedebtrelief.com | 12540 SW Leveton Dr, #P2150 Tualatin, OR, 97062
    `;

    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL!,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: "UTF-8",
          },
          Text: {
            Data: textBody,
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(command);
    return true;
  } catch {
    return false;
  }
}

export async function sendTestEmail(): Promise<boolean> {
  try {
    const testEmail = process.env.TEST_EMAIL || "test@example.com";

    return await sendWelcomeEmail({
      email: testEmail,
    });
  } catch {
    return false;
  }
}
