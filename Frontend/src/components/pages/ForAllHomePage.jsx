import { Herosection } from "../Herosection";
import BlogSection from "../HomePagecom/BlogSection";
import FAQSection from "../HomePagecom/FAQSection";
import FeaturedJobsSection from "../HomePagecom/FeaturedJobsSection";
import FeaturesSection from "../HomePagecom/FeaturesSection";
import HeroSection from "../HomePagecom/Herosec";
import HowItWorksSection from "../HomePagecom/HowItWorksSection";
import JobCategoriesSection from "../HomePagecom/JobCategoriesSection";
import NewsletterSection from "../HomePagecom/NewsletterSection";
import OurPartnersSection from "../HomePagecom/OurPartnersSection";
import TestimonialsSection from "../HomePagecom/Testimonial";

export const ForAllHomePage = () => {
  return (
    <>
      <Herosection />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <JobCategoriesSection />
      <FeaturedJobsSection />
      <OurPartnersSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
};
