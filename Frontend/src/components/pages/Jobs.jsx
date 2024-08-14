import React from "react";
import FilterCard from "../FilterCard";
import Jobcard from "../Jobcard";

const jobsArray = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3];
function Jobs() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-4">
        <div className="flex gap-5">
          <div className="w-[15%] ">
            <FilterCard />
          </div>

          {jobsArray <= 0 ? (
            <>
              <span>Jobs Not Found</span>
            </>
          ) : (
            <>
              <div className="flex-1 h-[88vh] overflow-y-auto  ">
                <div className=" grid grid-cols-3 gap-4 ">
                  {jobsArray.map((job, index) => (
                    <div>
                      <Jobcard />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Jobs;
