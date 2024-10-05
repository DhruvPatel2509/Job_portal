/* eslint-disable no-unused-vars */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/registerCompany`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate(`/admin/companies/${res.data.data._id}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="text-2xl font-bold">Your Company Name</h1>
          <p className="text-gray-500">
            What Would You Like To Give Your Comapny Name? You can Change This
            Later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="JobHunt , Microsoft etc.. "
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outlines"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </>
  );
}

export default CreateCompany;
