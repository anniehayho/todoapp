// import { createSlice } from '@reduxjs/toolkit';
// import { getUser } from '../API/loginAPI';

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     email: null
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.email = action.payload.email
//       state.isLoginSuccess = true
//     },
//     loginFailed: (state) => {
//       state.email = null,
//       state.isLoginFailed = true
//     },
//     logout: (state) => {
//       state.email = null
//     }
//   },
// })

// export const { loginSuccess, loginFailed, logout } = userSlice.actions
// export default userSlice.reducer