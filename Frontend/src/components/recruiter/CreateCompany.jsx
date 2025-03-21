/* eslint-disable no-unused-vars */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../utils/axiosUtility";
import { COMPANY_API_END_POINT } from "../../utils/constant";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty.");
      return;
    }

    try {
      const endpoint = `${COMPANY_API_END_POINT}/registerCompany`;

      const res = await apiRequest(
        "POST",
        endpoint,
        { companyName },
        token,
        dispatch
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/rec/companies/${res.data.data._id}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      console.error("API Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-10">
        <h1 className="text-2xl font-bold">Your Company Name</h1>
        <p className="text-gray-500">
          What Would You Like to Name Your Company? You can Change This Later.
        </p>
      </div>
      <Label>Company Name</Label>
      <Input
        type="text"
        className="my-2"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="JobHunt, Microsoft, etc."
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate("/rec/companies")}>
          Cancel
        </Button>
        <Button onClick={registerNewCompany} disabled={!companyName.trim()}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default CreateCompany;
