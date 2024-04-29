import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username
      state.isLoginSuccess = true
    },
    loginFailed: (state) => {
      state.username = null,
      state.isLoginFailed = true
    },
    logout: (state) => {
      state.username = null
    }
  },
})

export const { loginSuccess, loginFailed, logout } = userSlice.actions
export default userSlice.reducer