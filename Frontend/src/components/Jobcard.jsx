import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function Jobcard() {
  return (
    <div className="rounded-md p-5 shadow-xl border-gray-100">
      <div className="flex items-center justify-between">
        <p className=" text-sm text-gray-600 ">2 Days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2 ">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold">Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eum
          assumenda earum doloribus obcaecati perferendis est quos pariatur
          consectetur modi!
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          12 Position
        </Badge>
        <Badge variant="ghost" className="text-red-700 font-bold">
          24LPA
        </Badge>
        <Badge variant="ghost" className="text-purple-800 font-bold">
          Full Time
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-purple-800 ">Save For Later</Button>
      </div>
    </div>
  );
}

export default Jobcard;
