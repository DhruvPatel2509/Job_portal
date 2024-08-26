/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2Icon, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { allCompanies, searchCompanyByText } = useSelector(
    (state) => state.company
  );

  const [filterCompany, setFilterCompany] = useState(allCompanies);

  // const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany =
      allCompanies.length > 0 &&
      allCompanies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [allCompanies, searchCompanyByText]);

  const editHandler = (id) => {
    console.log(id);
  };

  return (
    <>
      <Table>
        <TableCaption>A List Of Your Recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany &&
            filterCompany.map((c) => (
              <TableRow key={c._id}>
                <TableCell>
                  <Avatar className="w-[80px] h-[45px]">
                    <AvatarImage src={c.logo} alt={`${c.name} Logo`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  {new Date(c.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-32"
                      onClick={() => editHandler(c._id)}
                    >
                      <div className="flex items-center gap-2 cursor-pointer w-fit">
                        <Edit2Icon className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CompaniesTable;
