import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { setAllApplicants } from "../../redux/applications";
import Applicantstable from "./Applicantstable";
import { Button } from "@/components/ui/button"; // Adjust import based on your structure
import { ArrowLeft } from "lucide-react"; // Adjust import based on your structure

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation

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
  }, [params.id, dispatch]);

  const { applicants } = useSelector((store) => store.application);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center my-5">
        <h1 className="font-bold text-xl">Applicants ({applicants.length})</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 font-semibold text-gray-500"
          onClick={() => navigate(-1)} // Navigate back
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
      </div>
      <Applicantstable />
    </div>
  );
}

export default Applicants;
