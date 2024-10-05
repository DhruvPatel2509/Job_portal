import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { MoreHorizontalIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

function Applicantstable() {
  const shortListingStatus = ["accepted", "rejected"];
  const { applicants } = useSelector((store) => store.application);

  // Local state to manage applicants
  const [localApplicants, setLocalApplicants] = useState(applicants);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalApplicants(applicants); // Sync with Redux store
  }, [applicants]);

  const statusHandler = async (status, id) => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/updateStatus/${id}`,
        { status }
      );
      toast.success(`${res.data.message} to ${status}`);

      // Update the status in local state
      setLocalApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id ? { ...applicant, status } : applicant
        )
      );
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A List Of Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localApplicants?.map((a) => (
            <tr key={a._id}>
              <TableCell>{a.applicant.fullname}</TableCell>
              <TableCell>{a.applicant.email}</TableCell>
              <TableCell>{a.applicant.phoneNumber}</TableCell>
              <TableCell>
                {a.applicant.profile.resumeOrignalName ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    href={a.applicant.profile.resume}
                  >
                    {a.applicant.profile.resumeOrignalName}
                  </a>
                ) : (
                  <>NA</>
                )}
              </TableCell>
              <TableCell>{a.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <div className="font-bold capitalize flex items-center justify-evenly">
                  <p
                    className={`text-[14px] p-2 ${
                      a.status === "accepted"
                        ? "bg-green-700 text-white"
                        : a.status === "pending"
                        ? "bg-gray-600 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {a.status}
                  </p>

                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent className="p-4 bg-white rounded-md shadow-md">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <p className="text-gray-600">Loading...</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <div className="text-center flex  capitalize font-bold gap-2">
                            {shortListingStatus.map((s, index) => (
                              <div
                                key={index}
                                onClick={() => statusHandler(s, a._id)}
                                className="flex flex-col"
                              >
                                <span className="border border-gray-300 p-2 rounded-md transition duration-200 hover:bg-gray-100 cursor-pointer">
                                  {s}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Applicantstable;
