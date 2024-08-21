import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAllJob`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
}

export default useGetAllJobs;
