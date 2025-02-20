import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useSelector } from "react-redux";
import useGetUserCompanies from "../../hooks/useGetUserCompanies";

function Companies() {
  const navigate = useNavigate();
  useGetUserCompanies();

  const { userCompanies } = useSelector((state) => state.company);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        {userCompanies ? (
          userCompanies.length > 0 ? null : (
            <Button onClick={() => navigate("/rec/companies/create")}>
              Add Your Company
            </Button>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <CompaniesTable />
    </div>
  );
}

export default Companies;
