import { Badge } from "@/components/ui/badge";

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

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <>
      <Table>
        <TableCaption className="font-bold">
          {allAppliedJobs?.length < 0
            ? "A List Of Your Applied Jobs"
            : "You Haven't Applied For The Jobs Yet"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item?.job?.title}</TableCell>
              <TableCell> {item?.job?.company?.name} </TableCell>
              <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={
                    item.status === "rejected"
                      ? "bg-red-600"
                      : item.status === "accepted"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }
                >
                  {item?.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default AppliedJobTable;
