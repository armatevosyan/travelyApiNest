import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import users from './users/saga';
import products from '@/redux/products/saga';

export default function* rootSaga() {
  yield all([auth(), users(), products()]);
}
