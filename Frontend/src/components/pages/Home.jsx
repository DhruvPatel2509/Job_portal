import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import HomePageSection from "../try";

export const Home = () => {
  useGetAllJobs();

  return (
    <>
      <Herosection />
      <CategoryCarousal />
      <HomePageSection />
      <LatestJob />
    </>
  );
};
