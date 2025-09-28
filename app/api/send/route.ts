import nodemailer from 'nodemailer';
import {emailToCustomer, emailToTeam, EmailPreview} from '@/components/custom/email-template';

export async function POST(request: Request) {
 

  const { firstname,lastname, email, message } = await request.json();
  
  // comment
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const html = emailToTeam({ firstname, lastname, email, message });

    await transporter.sendMail({
      from: `Nytt kundmejl <kontakt@nordiskdev.se>` ,
      to: 'kontakt@nordiskdev.se',
      subject: `Nytt mail från ${firstname} ${lastname }`,
      replyTo: email,
      html: emailToTeam({ firstname, lastname, email, message }),
    });

    await transporter.sendMail({
      from: 'NordDev Teamet <kontakt@nordiskdev.se>',
      to: email,
      subject: 'Tack för ditt meddelande',
      replyTo: `${email}`,
      html: emailToCustomer({ firstname, lastname, email, message }),
      
    });

    console.log("Mail skickat!");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail error:", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}