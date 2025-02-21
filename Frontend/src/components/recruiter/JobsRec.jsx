import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobsAdminTable from "./JobsRecTable";
import useGetJobsAdmin from "../../hooks/useGetJobsAdmin";
import { setSearchJobByText } from "../../redux/jobSlice";
import useGetUserCompanies from "../../hooks/useGetUserCompanies";

function JobsRec() {
  useGetJobsAdmin();
  useGetUserCompanies();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">
        <Input
          className="w-full sm:w-auto"
          placeholder="Filter By Name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate("/rec/jobs/create")}
        >
          New Jobs
        </Button>
      </div>
      <JobsAdminTable />
    </div>
  );
}


export default JobsRec;
