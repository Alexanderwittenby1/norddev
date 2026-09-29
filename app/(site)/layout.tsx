import Navbar from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="grow-1">{children}</main>
      <Footer />
    </>
  );
}
