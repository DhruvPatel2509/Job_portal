import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobsAdmin } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility";

function useGetJobsAdmin() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth); // Get token from auth state

  useEffect(() => {
    const fetchJobsAdmin = async () => {
      try {
        const endpoint = `${JOB_API_END_POINT}/adminPostedJob`;
        const res = await apiRequest("GET", endpoint, {}, token);

        if (res.status === 200) {
          dispatch(setAllJobsAdmin(res.data.data));
        }
      } catch (error) {
        dispatch(setAllJobsAdmin(null));
        console.log(error);
      }
    };
    fetchJobsAdmin();
  }, [dispatch, token]);
}

export default useGetJobsAdmin;
