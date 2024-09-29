import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";
import Footer from "../Footer";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  useGetAllJobs();
  // const { authUser } = useSelector((store) => store.auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (authUser && authUser.role === "recruiter") {
  //     navigate("/admin/companies");
  //   }
  // });
  return (
    <>
      <Herosection />
      <CategoryCarousal />
      <LatestJob />
      <Footer />
    </>
  );
};
