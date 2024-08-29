import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    alljobsAdmin: [],
    searchJobByText: "",
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllJobsAdmin: (state, action) => {
      state.alljobsAdmin = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAllJobsAdmin, setSearchJobByText } =
  jobSlice.actions;
export default jobSlice.reducer;
