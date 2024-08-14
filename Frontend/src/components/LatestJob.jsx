import React from "react";
import LatestJobCards from "./LatestJobCards";

function LatestJob() {
  const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          <span className="text-[#6A38C2] ">Latest & Top</span> Job Openings
        </h1>
        {randomJobs.map((item, index) => (
          <LatestJobCards />
        ))}
      </div>
    </>
  );
}

export default LatestJob;
