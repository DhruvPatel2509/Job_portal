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

function Applicantstable() {
  const shortListingStatus = ["accepted", "rejected"];
  const { applicants } = useSelector((store) => store.application);
  console.log(applicants);

  const statusHandler = async (status, id) => {
    console.log(status);
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/updateStatus/${id}`,{status}
      );
      console.log(res);
    } catch (error) {
      console.log(error);
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.map((a) => (
            <tr key={a._id}>
              <TableCell>{a.applicant.fullname} </TableCell>
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
              <TableCell className="text-center flex flex-col capitalize font-bold gap-4 ">
                {shortListingStatus.map((s, index) => (
                  <div
                    key={index}
                    onClick={() => statusHandler(s, a._id)}
                    className="flex flex-col"
                  >
                    <span className="border border-black p-2 cursor-pointer">
                      {" "}
                      {s}{" "}
                    </span>
                  </div>
                ))}
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Applicantstable;
