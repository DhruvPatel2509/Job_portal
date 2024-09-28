import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LatestJob() {
  const { allJobs } = useSelector((state) => state.job);
  return (
    <>
      <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          <span className="text-[#6A38C2] ">Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5">
          {allJobs <= 0
            ? "No Job Found"
            : allJobs
                .slice(0, 6)
                .map((job) => (
                  <LatestJobCards
                    
                    key={job._id}
                    job={job}
                  />
                ))}
        </div>
      </div>
    </>
  );
}

export default LatestJob;
