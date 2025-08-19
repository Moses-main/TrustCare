// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import web3Reducer from './slices/web3Slice';

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
});

export default store;
