import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../API/loginAPI';

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload.email
      state.isLoginSuccess = true
    },
    loginFailed: (state) => {
      state.email = null,
      state.isLoginFailed = true
    },
    logout: (state) => {
      state.email = null
    }
  },
})

export const { loginSuccess, loginFailed, logout } = userSlice.actions

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await getUser(email, password);
    if (response.user) {
      dispatch(loginSuccess({ email: response.user.displayName }));
    } else {
      dispatch(loginFailed());
    }
  } catch (error) {
    console.error(error);
    dispatch(loginFailed());
  }
};
export default userSlice.reducer