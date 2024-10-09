import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();

  const { searchedQuery } = useSelector((store) => store.job);
  const { authUser } = useSelector((store) => store.auth);

  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const url = searchedQuery
          ? `${JOB_API_END_POINT}/getAllJob/?keyword=${searchedQuery}`
          : `${JOB_API_END_POINT}/getAllJob`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        dispatch(setAllJobs(res.data.data));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    if (authUser) {
      fetchAllJobs();
    }
  }, [dispatch, searchedQuery, token, authUser]); // Added searchedQuery as a dependency
}

export default useGetAllJobs;
