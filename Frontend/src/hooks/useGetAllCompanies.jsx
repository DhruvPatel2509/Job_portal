import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setAllCompanies } from "../redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { authUser } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
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

    if (authUser) {
      fetchAllCompanies();
    }
  }, [dispatch, token, authUser]); // Added dependency to useEffect
}

export default useGetAllCompanies;
