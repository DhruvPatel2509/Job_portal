import { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import Jobcard from "../Jobcard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "../../hooks/useGetAllJobs";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useGetAllJobs();

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs?.filter((job) => {
        return (
          job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="flex gap-5">
        <div className="w-[15%]">
          <FilterCard />
        </div>

        {filterJobs?.length === 0 ? (
          <span>Jobs Not Found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {filterJobs?.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job._id}
                >
                  <Jobcard job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
