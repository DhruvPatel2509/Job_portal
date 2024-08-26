import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [dispatch, input]);
  return (
    <>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companie/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </>
  );
}

export default Companies;
