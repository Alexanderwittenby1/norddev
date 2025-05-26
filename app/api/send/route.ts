import emailTemplate from '@/components/custom/email-template';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'allewi@live.se',      
      subject: `Nytt mail från ${name}`,
      replyTo: email,
      react: emailTemplate({name, email, message}) as React.ReactElement,
    });


    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Tack för ditt meddelande',
      replyTo: 'allewi@live.se',
      text: `Hej ${name},\n\nTack för ditt meddelande! Vi kommer att återkomma till dig så snart som möjligt.\n\nMed vänliga hälsningar,\nNordDev Teamet`,
    });
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
    
    
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}