import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAllJob`, {
          withCredentials: true,
        });
        console.log(res);

        dispatch(setAllJobs(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
}

export default useGetAllJobs;
