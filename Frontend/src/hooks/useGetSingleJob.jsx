import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";

function useGetSingleJob(jobId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getJob/${jobId}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(setSingleJob(res.data.data)); // Corrected spelling
        } else {
          dispatch(setSingleJob(null));
          console.error(`Error: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching job:", error.message);
      }
    };
    fetchSingleJob();
  }, [jobId]);
}

export default useGetSingleJob;
