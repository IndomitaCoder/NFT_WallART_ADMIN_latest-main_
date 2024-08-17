import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    _id: "",
    username: "",
    password: "",
    email: "",
  },
  reducers: {
    setData: (state, action) => {
      state.account = action.payload;
    },
  },
})

export const { setData } = accountSlice.actions;

export const accountData = (state) => state.account.account;

export default accountSlice.reducer;
