import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2Icon, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function JobsRecTable() {
  const { alljobsAdmin, searchJobByText } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (alljobsAdmin?.length) {
      setFilterJobs(
        alljobsAdmin.filter((job) =>
          searchJobByText
            ? job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
            : true
        )
      );
    }
  }, [alljobsAdmin, searchJobByText]);

  return (
    <Table>
      <TableCaption className="font-bold">
        {filterJobs.length > 0
          ? "A List of Your Recent Posted Jobs"
          : "Post a Job First"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterJobs.map((job) => (
          <TableRow key={job._id}>
            <TableCell>{job?.company?.name || "N/A"}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>
              {new Date(job.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end items-center gap-4">
                <button
                  onClick={() => navigate(`/rec/jobs/${job._id}`)}
                  className="flex items-center gap-2 border border-black px-3 py-2 rounded-md cursor-pointer transition-all relative group 
                  hover:bg-gray-200 hover:scale-105"
                >
                  <Edit2Icon className="w-4" />
                  <span>Edit</span>
                  <span
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex 
                  bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap"
                  >
                    Edit Job Details
                  </span>
                </button>

                <button
                  onClick={() => navigate(`/rec/jobs/${job._id}/applicants`)}
                  className="flex items-center gap-2 border border-black px-3 py-2 rounded-md cursor-pointer transition-all relative group 
                  hover:bg-gray-200 hover:scale-105"
                >
                  <Eye className="w-4" />
                  <span>Applicants</span>
                  <span
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex 
                  bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap"
                  >
                    View Job Applicants
                  </span>
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default JobsRecTable;
