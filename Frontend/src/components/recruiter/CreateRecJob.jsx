import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import apiRequest from "../../utils/axiosUtility";

function CreateRecJob() {
  const { userCompanies } = useSelector((store) => store.company);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: 1,
    position: 0,
    company: "",
  });
  const { token } = useSelector((store) => store.auth);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = userCompanies?.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({
      ...input,
      company: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = `${JOB_API_END_POINT}/postjob`;

      const res = await apiRequest("POST", endpoint, input, token,dispatch);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/rec/jobs");
        setLoading(false);
      }
      setInput({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: 1,
        position: 0,
        company: "",
      });
    } catch (error) {
      console.error("Error submitting the job:", error);
      setError("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen my-4 ">
      <form
        onSubmit={submitHandler}
        className="px-6  py-4 max-w-4xl border-gray-400 shadow-lg rounded-md"
      >
        <Button
          variant="outline"
          className="flex items-center gap-2 font-semibold text-gray-500"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          <ArrowLeft /> <span>Back</span>
        </Button>
        {error && <p className="text-red-700">{error}</p>}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-500">
              * Separate requirements with commas (e.g., React.js, Node.js,
              MongoDB)
            </p>
            <Label>Requirements</Label>
            <Input
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              rows="3"
            />
          </div>

          <div>
            <Label>Salary (LPA)</Label>
            <Input
              type="number"
              placeholder="LPA"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              min="0"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div>
            <Label>No Of Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              min="0"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div>
            <Label>Experience Level</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              min="0"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
          </div>

          <div>
            {userCompanies?.length > 0 &&
              userCompanies[0]?.status === "approved" && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userCompanies.map((c) => (
                        <SelectItem key={c._id} value={c?.name?.toLowerCase()}>
                          {c?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
          </div>
        </div>
        <Button className="w-full mt-4" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </Button>
        {userCompanies.length === 0 && (
          <p className="text-xs text-red-700 font-bold text-center my-3">
            *Please Register a Company First before Posting New Jobs
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateRecJob;
