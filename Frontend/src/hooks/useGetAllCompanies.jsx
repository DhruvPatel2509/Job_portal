import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setAllCompanies } from "../redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`, {
          withCredentials: true,
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
  });
}

export default useGetAllCompanies;
