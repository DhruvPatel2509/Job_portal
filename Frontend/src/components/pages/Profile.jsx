import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "../AppliedJobTable";
import UpdateProfile from "../UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";

function Profile() {
  const isResume = true;
  const { authUser } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const skills = authUser?.profile?.skills || [];

  useGetAppliedJobs();

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto my-5 bg-white border border-gray-200 rounded-2xl shadow-md ">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <img
              src={authUser?.profile?.profilePhoto}
              alt=""
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full"
            />
            <div>
              <h1 className="text-xl font-semibold">{authUser?.fullname}</h1>
              <p className="text-gray-600">{authUser?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(!open)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="text-gray-600" />
            <span>{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="text-gray-600" />
            <span>{authUser?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg">Skills</h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {skills.length > 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
          <Label className="font-bold text-md">Resume</Label>

          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={authUser?.profile?.resume}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {authUser?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
        <h1 className="my-5 text-lg font-bold">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
