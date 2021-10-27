import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfo: (state, action) => {
      const { info } = action.payload;
      console.log("Setting user in app", { ...info });
      state.info = info;
    },
    removeInfo: (state, action) => {
      console.log("Removing user");
      return initialState;
    },
  },
});

export const { updateInfo, removeInfo } = userSlice.actions;
export default userSlice.reducer;
