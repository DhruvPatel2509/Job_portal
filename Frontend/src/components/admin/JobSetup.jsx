import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetSingleJob from "../../hooks/useGetSingleJob";
import { JOB_API_END_POINT } from "../../utils/constant";

function JobSetup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const jobId = params.id;

  // Custom hook to fetch single job
  useGetSingleJob(jobId);
  const { singleJob } = useSelector((state) => state.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
  });

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        position: singleJob.position || "",
        experience: singleJob.experience || "",
      });
    }
  }, [singleJob]);

  const changeEventHandler = ({ target: { name, value } }) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/updateJob/${jobId}`,
        input, // Sending input directly as JSON
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message); // Show error using toast
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen my-5">
      <form
        onSubmit={handleSubmit}
        className="p-8 max-w-4xl border-gray-400 shadow-lg rounded-md"
      >
        {error && <p className="text-red-700">{error}</p>}
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(input).map((key) => (
            <div key={key}>
              <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input
                type={
                  key === "salary" || key === "experience" || key === "position"
                    ? "number"
                    : "text"
                }
                name={key}
                value={input[key]}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
                disabled={loading}
              />
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default JobSetup;
