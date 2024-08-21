import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

function Companies() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter By Name" />
          <Button onClick={() => navigate("/admin/companie/create")}> New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </>
  );
}

export default Companies;