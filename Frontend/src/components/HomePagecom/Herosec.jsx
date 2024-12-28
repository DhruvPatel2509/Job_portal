const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#4a3a67] to-[#431692] text-white py-16 px-6 md:px-16 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Find Your <span className="text-[#F83002]">Dream Job</span> Today
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Empowering students and recruiters to connect, collaborate, and grow.
      </p>
      <button className="bg-[#F83002] px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition">
        Get Started
      </button>
    </div>
  );
};

export default HeroSection;
