import React from "react";

const partners = [
  { name: "Google", logo: "/logos/google.png" },
  { name: "Amazon", logo: "/logos/amazon.png" },
  { name: "Facebook", logo: "/logos/facebook.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
];

const OurPartnersSection = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our <span className="text-[#F83002]">Partners</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center"
          >
            <img src={partner.logo} alt={partner.name} className="h-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPartnersSection;