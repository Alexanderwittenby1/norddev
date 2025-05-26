type EmailTemplateProps = {
    name: string;
    email: string;
    message: string;
};
export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.4' }}>
            <h3 style={{ color: '#333' }}>Nytt mail från: {name}</h3>
            
            <p>{message}</p>
        </div>
    );
}
export default EmailTemplate;