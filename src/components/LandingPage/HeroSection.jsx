import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mx-24 mt-16 mb-0">
      <div className="flex flex-col gap-10 items-center text-center">
        {/* Hero Section Title */}
        <h1 className="font-bold text-6xl">
          Coordination Between Doctors and Patients
        </h1>

        {/* Description */}
        <p className="w-4/6 font-medium mx-auto">
          Our platform is dedicated to simplifying patient management, offering
          organized medical records and intuitive appointment scheduling.
        </p>

        {/* Call-to-Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }} // Animation on hover
          whileTap={{ scale: 0.9 }} // Animation on tap
          onClick={() => (window.location.href = "/signup")}
          className="bg-secondary px-10 py-4 text-white w-fit rounded-md font-semibold text-2xl"
        >
          Get Started
        </motion.button>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center items-center ml-10">
        <img
          src="images/hero.svg"
          className="w-[60rem] object-contain"
          alt="Illustration of coordination between doctors and patients"
        />
      </div>
    </div>
  );
};

export default HeroSection;
