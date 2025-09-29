import { EmailPreview } from "@/components/custom/email-template";

export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") {
    return <div>Preview inte tillgänglig i prod</div>;
  }

  return (
    <EmailPreview
      firstname="Kalle"
      lastname="Andersson"
      email="kalle.andersson@example.com"
      message="Hej, detta är ett testmeddelande."
    />
  );
}
