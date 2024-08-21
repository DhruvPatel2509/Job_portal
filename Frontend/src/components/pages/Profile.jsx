import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "../AppliedJobTable";
import UpdateProfile from "../UpdateProfile";
import { useSelector } from "react-redux";

function Profile() {
  const isResume = true;
  const { authUser } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const skills = authUser?.profile?.skills || [];

  return (
    <>
      <div className="max-w-4xl p-8 mx-auto my-5 bg-white border border-gray-200 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={authUser?.profile?.profilePhoto}  />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{authUser?.fullname}</h1>
              <p>{authUser?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span> {authUser?.phoneNumber} </span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-2 mt-2">
            {skills.length >= 0
              ? skills.map((item, index) => <Badge key={index}>{item} </Badge>)
              : "NA"}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-bold text-md">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={authUser?.profile?.resume}
              className="w-full text-blue-500 cursor-pointer hover:underline"
            >
              {authUser?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="my-5 text-lg font-bold">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
