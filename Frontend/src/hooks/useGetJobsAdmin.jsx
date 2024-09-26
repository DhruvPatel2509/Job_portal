import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobsAdmin } from "../redux/jobSlice";

function useGetJobsAdmin() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobsAdmin = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/adminPostedJob`, {
          withCredentials: true,
        });

        dispatch(setAllJobsAdmin(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobsAdmin();
  }, [dispatch]);
}

export default useGetJobsAdmin;
