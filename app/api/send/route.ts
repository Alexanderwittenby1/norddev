import nodemailer from 'nodemailer';
import emailTemplate from '@/components/custom/email-template';

export async function POST(request: Request) {
  console.log("POST /api/send called"); // <-- Lägg till denna rad

  const { name, email, message } = await request.json();
  console.log("Received data:", { name, email, message }); // <-- och denna

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
    const html = emailTemplate({ name, email, message });

    await transporter.sendMail({
      from: "info@nordiskdev.se",
      to: 'info@nordiskdev.se',
      subject: `Nytt mail från ${name}`,
      replyTo: email,
      html,
    });

    await transporter.sendMail({
      from: 'NordDev Teamet <info@nordiskdev.se>',
      to: email,
      subject: 'Tack för ditt meddelande',
      replyTo: 'allewi@live.se',
      text: `Hej ${name},\n\nTack för ditt meddelande! Vi kommer att återkomma till dig så snart som möjligt.\n\nMed vänliga hälsningar,\nNordDev Teamet`,
    });

    console.log("Mail skickat!");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Mail error:", error);
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}