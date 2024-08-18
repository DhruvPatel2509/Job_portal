import React from "react";
import FilterCard from "../FilterCard";
import Jobcard from "../Jobcard";
import { useSelector } from "react-redux";
import { useSelector } from "react-redux";

function Jobs() {
  const { allJobs } = useSelector((state) => state.job);

  const { allJobs } = useSelector((state) => state.job);

  

  return (
    <>
      <div className="max-w-7xl mx-auto mt-4">
        <div className="flex gap-5 ">
          <div className="w-[15%] ">
            <FilterCard />
          </div>

          {allJobs <= 0 ? (
          {allJobs <= 0 ? (
            <>
              <span>Jobs Not Found</span>
            </>
          ) : (
            <>
              <div className="flex-1 h-[88vh] overflow-y-auto  ">
                <div className=" grid grid-cols-3 gap-4 ">
                  {allJobs.map((job) => (
                  {allJobs.map((job) => (
                    <div>
                      <Jobcard job={job} key={job._id} />
                      <Jobcard job={job} key={job._id} />
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
