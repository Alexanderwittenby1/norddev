type EmailTemplateProps = {
    name: string;
    email: string;
    message: string;
};
export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
            <h2 style={{ color: '#333' }}>Kontaktformulär från {name}</h2>
            <p><strong>Namn:</strong> {name}</p>
            <p><strong>E-post:</strong> {email}</p>
            <p><strong>Meddelande:</strong></p>
            <p>{message}</p>
        </div>
    );
}
export default EmailTemplate;