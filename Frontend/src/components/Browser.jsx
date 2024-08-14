import React from "react";
import Jobcard from "../components/Jobcard";

function Browser() {
  const randomJobs = [1, 1, 1];
  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 ">
          {randomJobs.map((item, index) => (
            <div>
              <Jobcard />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Browser;
