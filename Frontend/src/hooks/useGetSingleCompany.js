import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setSingleComapny } from "../redux/companySlice"; // Corrected spelling

function useGetSingleCompany(companyId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/getCompany/${companyId}`, // Added the missing '/'
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          dispatch(setSingleComapny(res.data.data)); // Corrected spelling
        } else {
          dispatch(setSingleComapny(null));
          console.error(`Error: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching company:", error.message);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
}

export default useGetSingleCompany;
