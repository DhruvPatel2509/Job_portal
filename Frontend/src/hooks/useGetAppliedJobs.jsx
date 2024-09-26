import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      axios.defaults.withCredentials = true;
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/getAppliedJob`
        );

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  });
};

export default useGetAppliedJobs;
