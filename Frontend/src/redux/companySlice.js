import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompanies: [],
    singleCompany: null,
  },

  reducers: {
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setSingleComapny: (state, action) => {
      state.singleCompany = action.payload;
    },
  },
});

export const { setAllCompanies, setSingleComapny } = companySlice.actions;
export default companySlice.reducer;
