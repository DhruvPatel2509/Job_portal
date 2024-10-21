import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setAllCompanies } from "../redux/companySlice";
import apiRequest from "../utils/axiosUtility";
import { setLoading } from "../redux/authSlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { authUser } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      const endpoint = `${COMPANY_API_END_POINT}/getCompany`;
      try {
        const res = await apiRequest("GET", endpoint, {}, token);

        if (res.status === 200) {
          dispatch(setAllCompanies(res.data.data));
        }
      } catch (error) {
        dispatch(setAllCompanies([]));
        console.error("Error fetching companies:", error);
      } finally {
        console.log("finally");
      }
    };

    if (authUser) {
      fetchAllCompanies();
    }
  }, [dispatch, token, authUser]);
}

export default useGetAllCompanies;
