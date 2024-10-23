import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Edit2Icon, MoreHorizontalIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CompaniesTable() {
  const { allCompanies, searchCompanyByText } = useSelector(
    (state) => state.company
  );
  const [filteredCompanies, setFilteredCompanies] = useState(allCompanies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = allCompanies?.filter(
      (company) =>
        !searchCompanyByText ||
        company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilteredCompanies(filteredCompany);
  }, [allCompanies, searchCompanyByText]);

  const editHandler = (id) => {
    navigate(`/admin/companies/${id}`);
  };

  return (
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
        {filteredCompanies?.map((company) => (
          <TableRow key={company._id}>
            <TableCell>
              <Avatar className="w-[80px] h-[45px]">
                <AvatarImage src={company.logo} alt={`${company.name} Logo`} />
                <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>
              {new Date(company.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontalIcon />
                </PopoverTrigger>
                <PopoverContent
                  className="w-32"
                  onClick={() => editHandler(company._id)}
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
  );
}

export default CompaniesTable;
