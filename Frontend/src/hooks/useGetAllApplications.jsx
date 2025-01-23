import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import apiRequest from "../utils/axiosUtility";
import { setAllApplications } from "../redux/applications";
import { setApiLoading } from "../redux/authSlice";

const useGetAllApplications = () => {
  const { token, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplication = async () => {
      const endpoint = `${APPLICATION_API_END_POINT}/getAllApplications`;
      try {
        dispatch(setApiLoading(true));

        const res = await apiRequest("GET", endpoint, {}, token);

        if (res.status === 200) {
          dispatch(setAllApplications(res.data.data));
        } else {
          dispatch(setAllApplications([]));
        }
      } catch (error) {
        dispatch(setAllApplications([]));
        console.error("Error fetching companies:", error);
      } finally {
        dispatch(setApiLoading(false));
      }
    };
    if (authUser) {
      fetchAllApplication();
    }
  }, [token, authUser, dispatch]);
};

export default useGetAllApplications;
