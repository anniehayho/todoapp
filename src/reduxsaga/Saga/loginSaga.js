import { call, put, takeEvery, all } from 'redux-saga/effects';
import { loginSuccess, loginFailed } from '../../redux/userSlice';
import { getUser } from '../API/loginAPI';

function* login(action) {
  try {
    const response = yield call(getUser);
    if (response.data.check_login === 'true') {
        console.log('Login Success');
        yield put(loginSuccess(action.payload));
    } else {
        yield put(loginFailed());
    }
  } catch (error) {
      yield put(loginFailed());
  }
}

function* watchLogin() {
  yield takeEvery('LOGIN_REQUEST', login);
}

export default function* loginSaga() {
  yield all([watchLogin()]);
}