import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    uid: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload.email
      state.userID = action.payload.uid
      state.isLoginSuccess = true
    },
    loginFailed: (state) => {
      state.email = null,
      state.userID = null,
      state.isLoginFailed = true
    },
    logout: (state) => {
      state.email = null
    }
  },
})

export const { loginSuccess, loginFailed, logout } = userSlice.actions
export default userSlice.reducer