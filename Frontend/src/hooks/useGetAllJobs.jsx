import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchAllJobs = async () => {
      try {
        const url = searchedQuery
          ? `${JOB_API_END_POINT}/getAllJob/?keyword=${searchedQuery}`
          : `${JOB_API_END_POINT}/getAllJob`;

        const res = await axios.get(url);
        console.log(res.data.data);
        dispatch(setAllJobs(res.data.data));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs(); // Always fetch, with or without a query
  }, [dispatch, searchedQuery]); // Added searchedQuery as a dependency
}

export default useGetAllJobs;
