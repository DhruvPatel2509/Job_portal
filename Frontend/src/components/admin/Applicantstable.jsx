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

function Applicantstable() {
  const { applicants } = useSelector((store) => store.application);
  console.log(applicants);

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
                <a
                  className="text-blue-600 cursor-pointer"
                  href={a.applicant.profile.resume}
                >
                  {a.applicant.profile.resumeOrignalName}
                </a>
              </TableCell>
              <TableCell>{a.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <p>Accepted</p>
                <p>Rejected</p>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Applicantstable;
