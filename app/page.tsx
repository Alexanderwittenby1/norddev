import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Vi på NordDev</h1>
      <Image
        src="/NordDev.png"
        alt="NordDev Logo"
        width={500}
        height={500}
        className="mt-8 rounded-full"
        />
      <p className="mt-4 text-lg">
        Vi är ett team av passionerade utvecklare som älskar att skapa innovativa lösningar. 
        Vårt mål är att leverera högkvalitativa produkter och tjänster som gör skillnad.
      </p>
    </main>
  );
}
