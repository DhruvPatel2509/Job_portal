import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility";

function useGetSingleJob(jobId) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const endpoint = `${JOB_API_END_POINT}/getJob/${jobId}`;
        const res = await apiRequest("GET", endpoint, {}, token);

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
  }, [jobId, token, dispatch]);
}

export default useGetSingleJob;
