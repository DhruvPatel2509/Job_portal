import { USER_API_END_POINT } from "../utils/constant";
import { setAllJobs, setSingleJob, setAllJobsAdmin } from "../redux/jobSlice";
import { setAllCompanies } from "../redux/companySlice";

import { toast } from "sonner";
import { setAuthUser, setToken } from "../redux/authSlice";
import apiRequest from "./axiosUtility";

export const logOutHandler = async (dispatch, navigate, token) => {
  try {
    const endpoint = `${USER_API_END_POINT}/logOut`;
    const res = await apiRequest("GET", endpoint, {}, token);

    if (res.data.success) {
      toast.success(`${res.data.message}`);

      dispatch(setAuthUser(null));
      dispatch(setSingleJob(null));
      dispatch(setAllJobs(null));
      dispatch(setAllCompanies(null));
      dispatch(setToken(""));
      dispatch(setAllJobsAdmin(null));
      navigate("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed.");
  }
};
