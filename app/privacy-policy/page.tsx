
export const metadata = {
  title: "Integritetspolicy - NordiskDev",
  description: "Läs NordiskDev:s integritetspolicy om hur vi hanterar och skyddar dina personuppgifter när du använder vår webbplats och våra tjänster.",
};

import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto px-4  my-20 h-full '>
        
      <h1 className='text-3xl font-bold mb-6'>Integritetspolicy</h1>
      <p className='mb-4'>Denna integritetspolicy beskriver hur NordDev samlar in, använder och skyddar din information när du besöker vår webbplats och använder våra tjänster. Vi värnar om din integritet och strävar efter att skydda dina personuppgifter i enlighet med gällande dataskyddslagstiftning.</p>
      <h2 className='text-2xl font-semibold mb-4'>1. Insamling av information</h2>
      <p className='mb-4'>Vi samlar in information som du frivilligt lämnar till oss när du kontaktar oss via vårt kontaktformulär. Denna information kan inkludera ditt namn, e-postadress och meddelande.</p>
      <h2 className='text-2xl font-semibold mb-4'>2. Användning av information</h2>
      <p className='mb-4'>Den information vi samlar in används för att:</p>
      <ul className='list-disc list-inside mb-4'>
        <li>Besvara dina frågor och meddelanden</li>
        <li>Förbättra vår webbplats och våra tjänster</li>
        <li>Skicka dig information och uppdateringar relaterade till dina förfrågningar</li>
      </ul>
      <h2 className='text-2xl font-semibold mb-4'>3. Delning av information</h2>
      <p className='mb-4'>Vi säljer eller delar inte din personliga information med tredje part utan ditt samtycke, förutom när det krävs enligt lag eller för att skydda våra rättigheter.</p>
      <h2 className='text-2xl font-semibold mb-4'>4. Säkerhet</h2>
      <p className='mb-4'>Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda din information mot obehörig åtkomst, förlust eller missbruk. Trots våra ansträngningar kan ingen metod för överföring över internet eller elektronisk lagring vara helt säker.</p>
      <h2 className='text-2xl font-semibold mb-4'>5. Dina rättigheter</h2>
      <p className='mb-4'>Du har rätt att begära tillgång till, korrigering av eller radering av dina personuppgifter. Du kan också invända mot behandlingen av dina uppgifter eller begära begränsning av behandlingen. För att utöva dessa rättigheter, vänligen kontakta oss via kontaktinformationen nedan.</p>
      <h2 className='text-2xl font-semibold mb-4'>6. Ändringar i integritetspolicyn</h2>
      <p className='mb-4'>Vi förbehåller oss rätten att uppdatera denna integritetspolicy när som helst. Eventuella ändringar kommer att publiceras på denna sida med ett uppdaterat datum. Vi rekommenderar att du regelbundet granskar denna policy för att hålla dig informerad om hur vi skyddar din information.</p>
      <h2 className='text-2xl font-semibold mb-4'>7. Kontaktinformation</h2>
      <p className='mb-4'>Om du har några frågor eller funderingar angående denna integritetspolicy eller vår hantering av dina personuppgifter, vänligen kontakta oss på:</p>
      <p className='mb-4'>E-post: info@nordiskdev.se</p>
        
    </div>
  )
}

export default PrivacyPolicy;