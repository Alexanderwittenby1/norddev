import Image from "next/image";
import React from "react";
import Hero from "@/components/custom/hero";
import Navbar from "@/components/custom/navbar";


export default function Home() {

  const MetaData = {
    title: "NordDev",
    description: "Vi på NordDev",
    Apputveckling: "Mer information om apputveckling kommer snart.",
    Webbutveckling: "Mer information om webbutveckling kommer snart.",
    konsultering: "Mer information om konsulttjänster kommer snart.",
  };

  return (
    <div >
      <Navbar />
      <Hero />
      {/* new section */}
      <section className="bg-gray-100 py-16 h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-8">Våra Tjänster</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:w-100 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Konsultering</h3>
              <p className="text-gray-700">
                {MetaData.konsultering}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Webbutveckling</h3>
              <p className="text-gray-700">
                {MetaData.Webbutveckling}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Apputveckling</h3>
              <p className="text-gray-700">
                {MetaData.Apputveckling}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
