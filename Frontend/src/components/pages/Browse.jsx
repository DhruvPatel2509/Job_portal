import Jobcard from "../Jobcard";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchedQuery } from "../../redux/jobSlice";

function Browse() {
  const { searchJobs } = useSelector((store) => store.job);
  useGetAllJobs();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery("")); // Reset the searchedQuery when leaving the page
    };
  }, [dispatch]);

  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        {searchJobs && searchJobs?.length > 0 ? (
          <>
            <h1 className="font-bold text-xl my-10">
              Search Results ({searchJobs?.length})
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
              {searchJobs?.map((job, index) => (
                <div key={index}>
                  <Jobcard job={job} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center font-bold text-[26px]">NO JOBS FOUND</h1>
          </>
        )}
      </div>
    </>
  );
}

export default Browse;
