import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authUser: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    clearAuthUser: (state, action) => {
      state.authUser = action.payload; // Clear the user state on logout or if cookie is absent
    },
  },
});

// Export actions for use in components
export const { setLoading, setAuthUser, clearAuthUser } = authSlice.actions;

// Export the reducer for store configuration
export default authSlice.reducer;
