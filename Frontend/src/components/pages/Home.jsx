import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";
import Footer from "../Footer";
import useGetAllJobs from "../../hooks/useGetAllJobs";

export const Home = () => {
  useGetAllJobs();
  return (
    <>
      <Herosection />
      <CategoryCarousal />
      <LatestJob />
      <Footer />
    </>
  );
};
