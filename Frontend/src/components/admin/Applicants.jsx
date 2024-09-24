import { useEffect } from "react";
import Applicantstable from "./Applicantstable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applications";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/getApplicant/${params.id}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.data.application));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants();
  }, [params.id, dispatch]); // Include params.id as a dependency

  const { applicants } = useSelector((store) => store.application);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold text-xl my-5">
        Applicants ({applicants.length})
      </h1>
      <Applicantstable />
    </div>
  );
}

export default Applicants;
