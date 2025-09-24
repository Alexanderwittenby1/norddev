import type { NextPage } from 'next';
import Link from 'next/link';

const Homepage: NextPage = () => {
  return (
    <section
  className="w-full flex my-4 flex-col items-center justify-center bg-gray px-4 text-center text-4xl text-black font-roboto-mono"
  style={{ minHeight: 'calc(100vh - 120px)' }} 
>
  <div className="max-w-xl w-full flex flex-col items-center justify-center gap-6">
    <h1 className="w-full text-4xl md:text-5xl font-bold mb-2">Er Vision Vår Utmaning</h1>
    <p className="w-full text-base md:text-lg mb-6">Vi gör er vision till en verklighet</p>
    <Link
      href="/kontakt"
      className="inline-block text-center text-2xl text-white font-roboto-mono bg-[var(--accent)] rounded-[25px] hover:bg-[var(--accent-dark)] transition-colors duration-300 ease-in-out px-8 py-3 shadow-md"
    >
      <span className="text-black font-roboto-mono">Kontakta oss</span>
    </Link>
  </div>
</section>

  );
};

export default Homepage;

