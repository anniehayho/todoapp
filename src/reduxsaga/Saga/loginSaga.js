import { call, put, takeEvery, all } from 'redux-saga/effects';
import { loginSuccess, loginFailed } from '../../redux/userSlice';
import { getUser } from '../API/loginAPI';

function* login(action) {
  yield put({ type: 'SET_LOADING', payload: true });
  try {
    const response = yield call(getUser, action.payload.email, action.payload.password);
    if (response.user) {
      const user = {
        email: response.user.email,
        uid: response.user.uid,
        // add any other user properties you need here
      };
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailed());
    }
  } catch (error) {
    console.error(error);
    yield put(loginFailed());
  }
  yield put({ type: 'SET_LOADING', payload: false });
}

function* watchLogin() {
  yield takeEvery('LOGIN_REQUEST', login);
}

export default function* loginSaga() {
  yield all([watchLogin()]);
}