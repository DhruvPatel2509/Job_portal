import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail, Contact, Pen } from "lucide-react";
import UpdateRecProfile from "./UpdateRecProile";

const RecruiterHome = () => {
  const { authUser } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto my-5 bg-white border border-gray-200 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28">
              <AvatarImage src={authUser?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold">{authUser?.fullname}</h1>
              <p className="text-gray-600">Recruiter</p>
            </div>
          </div>
          <Button onClick={() => setOpen(!open)} variant="outline">
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-600" />
            <span className="text-lg">{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-600" />
            <span className="text-lg">{authUser?.phoneNumber}</span>
          </div>
        </div>
      </div>
      <UpdateRecProfile open={open} setOpen={setOpen} />
    </>
  );
};

export default RecruiterHome;
