import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username
    },
    loginFailed: (state) => {
      state.username = null
    },
    logout: (state) => {
      state.username = null
    }
  },
})

export const { loginSuccess, loginFailed, logout } = userSlice.actions
export default userSlice.reducer