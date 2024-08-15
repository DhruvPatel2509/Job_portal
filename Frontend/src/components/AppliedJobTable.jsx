import React from "react";
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

function AppliedJobTable() {
  return (
    <>
      <Table>
        <TableCaption>A List Of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, , 1, 1].map((item, index) => (
            <TableRow key={index}>
              <TableCell>17-07-2024</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Microsoft</TableCell>
              <TableCell className="text-right">
                <Badge>Pending</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default AppliedJobTable;
