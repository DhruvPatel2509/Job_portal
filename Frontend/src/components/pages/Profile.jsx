import React, { useState } from "react";
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
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={authUser?.profile?.profilePhoto}  />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{authUser?.fullname}</h1>
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
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={authUser?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {authUser?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
