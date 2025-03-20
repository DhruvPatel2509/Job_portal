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
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption className="font-bold">
          {filterJobs.length > 0
            ? "A List of Your Recent Posted Jobs"
            : "Post a Job First"}
        </TableCaption>
        <TableHeader>
          <TableRow className="text-sm">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id} className="text-sm">
              <TableCell>{job?.company?.name || "N/A"}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/rec/jobs/${job._id}`)}
                    className="flex items-center gap-2 border border-black px-3 py-2 rounded-md cursor-pointer transition-all relative group 
                    hover:bg-gray-200 hover:scale-105 text-sm"
                  >
                    <Edit2Icon className="w-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => navigate(`/rec/jobs/${job._id}/applicants`)}
                    className="flex items-center gap-2 border border-black px-3 py-2 rounded-md cursor-pointer transition-all relative group 
                    hover:bg-gray-200 hover:scale-105 text-sm"
                  >
                    <Eye className="w-4" />
                    <span>Applicants</span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


export default JobsRecTable;
