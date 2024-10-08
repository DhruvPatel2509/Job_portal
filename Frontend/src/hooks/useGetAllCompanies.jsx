import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setAllCompanies } from "../redux/companySlice";
import Cookies from "js-cookie";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const token = Cookies.get("token"); // Get the token from cookies

        const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true, // Keep this if you need to send cookies
        });

        if (res.status === 200) {
          dispatch(setAllCompanies(res.data.data));
        } else {
          dispatch(setAllCompanies([]));
          console.error(`Error: ${res.status}`);
        }
      } catch (error) {
        dispatch(setAllCompanies([]));
        console.error("Error fetching companies:", error.message);
      }
    };

    fetchAllCompanies();
  }, [dispatch]); // Added dependency to useEffect
}

export default useGetAllCompanies;
