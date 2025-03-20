import { useState } from "react";
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
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser } from "../../redux/authSlice";
import apiRequest from "../../utils/axiosUtility";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function UpdateRecProfile({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: authUser?.fullname,

    number: authUser?.phoneNumber,
    profilePhoto: null,
  });
  const { token } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const profilePhotoChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 10 MB. Please choose a smaller file.");
      e.target.value = null;
    } else {
      setInput({ ...input, profilePhoto: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.name);

    formData.append("phoneNumber", input.number);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

    try {
      setLoading(true);
      const endpoint = `${USER_API_END_POINT}/profile/update`;
      const res = await apiRequest("PUT", endpoint, formData, token, dispatch);
      dispatch(setAuthUser(res.data.data));
      toast.success(res.data.message);
      handleClose();
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInput({
      name: authUser?.fullname,

      number: authUser?.phoneNumber,
      profilePhoto: null,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[550px]"
        onInteractOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={input.name}
                onChange={changeEventHandler}
                className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                name="number"
                id="number"
                value={input.number}
                onChange={changeEventHandler}
                className="col-span-3 py-1.5 border-2 border-gray-300 rounded"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                onChange={profilePhotoChangeHandler}
                accept="image/*"
                className="col-span-3 py-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full my-4" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateRecProfile;
