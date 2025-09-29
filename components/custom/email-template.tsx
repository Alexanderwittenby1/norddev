type EmailTemplateProps = {
  firstname: string;
  lastname?: string;
  email: string;
  message: string;
};

export function emailToTeam({ firstname, lastname, email, message }: EmailTemplateProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.4; color: #333; padding: 20px;">
      <h3 style="color: #1a1a1a;">Nytt meddelande från: ${firstname} ${lastname || ""}</h3>
      <p><strong>E-post:</strong> ${email}</p>
      <p style="margin-top: 10px;">${message}</p>
      <hr style="margin-top: 20px; border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 0.9rem; color: #555;">Skickat automatiskt via kontaktformuläret.</p>
    </div>
  `;
}

export function EmailPreview({ firstname, lastname, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.4 }}>
      <h3 style={{ color: "#333" }}>Nytt mail från: {firstname} {lastname}</h3>
      <p><strong>E-post:</strong> {email}</p>
      <p>Meddelande: {message}</p>
    </div>
  );
 
}

export function emailToCustomer({ firstname, lastname }: EmailTemplateProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.4; color: #333; padding: 20px;">
      <h3 style="color: #1a1a1a;">Hej ${firstname} ${lastname || ""}!</h3>
      <p>Tack för ditt meddelande! Vi har mottagit det och återkommer så snart som möjligt.</p>
      <p>Med vänliga hälsningar,<br/>NordDev Teamet</p>
      
      
      
      <div>
        <a href="https://nordiskdev.se">
        Nordiskdev - Din techpartner i södra Sverige
        </a><br/>
        <img src="https://nordiskdev.se/logo-mail.png" width="120" height="100" alt="NordiskDev logga">
      </div>

      
    </div>
  `;
}

