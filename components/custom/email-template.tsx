type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

export default function emailTemplate({ name, email, message }: EmailTemplateProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.4;">
      <h3 style="color: #333;">Nytt mail från: ${name}</h3>
      <p><strong>E-post:</strong> ${email}</p>
      <p>${message}</p>
    </div>
  `;
}