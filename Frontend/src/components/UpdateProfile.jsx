import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setAuthUser } from "../redux/authSlice";
import { toast } from "sonner";

function UpdateProfile({ open, setOpen }) {
  const [loading, setLoading] = useState(false);

  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: authUser?.fullname,
    email: authUser?.email,
    number: authUser?.phoneNumber,
    bio: authUser?.profile?.bio,
    skills: authUser?.profile?.skills,
    file: authUser?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.number);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(setAuthUser(res.data.data));
      console.log("Response:", res.data);
      toast.success(res.data.message);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[550px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="number">Number</label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={input.number}
                  onChange={changeEventHandler}
                  className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="bio">Bio</label>
                <input
                  type="text"
                  name="bio"
                  id="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="skills">Skills</label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="file">Resume</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="col-span-3 py-1.5 "
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <>
                  <Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </Button>
                </>
              ) : (
                <>
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfile;
