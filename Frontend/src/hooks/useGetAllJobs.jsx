import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility.js";
import { setLoading } from "../redux/authSlice.js";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const { authUser, token } = useSelector((store) => store.auth);

  useEffect(() => {
    const getJobs = async () => {
      if (authUser) {
        const endpoint = searchedQuery
          ? `job/getAllJob/?keyword=${searchedQuery}`
          : "job/getAllJob";

        try {
          const res = await apiRequest("GET", endpoint, {}, token);

          if (res.status === 200) {
            dispatch(setAllJobs(res.data.data));
          }
        } catch (error) {
          console.log(error);
        } 
      }
    };

    if (authUser) {
      getJobs();
    }
  }, [dispatch, searchedQuery, token, authUser]);
}

export default useGetAllJobs;
