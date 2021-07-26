import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';
import loadingReducer from './loadingReducer';

export default configureStore({
  reducer: {
    loading: loadingReducer,
    account: accountReducer
  },
});
 