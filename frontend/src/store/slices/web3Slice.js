// src/store/slices/web3Slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  web3: null,
  accounts: [],
  networkId: null,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setWeb3(state, action) {
      state.web3 = action.payload;
    },
    setAccounts(state, action) {
      state.accounts = action.payload || [];
    },
    setNetworkId(state, action) {
      state.networkId = action.payload ?? null;
    },
    resetWeb3(state) {
      state.web3 = null;
      state.accounts = [];
      state.networkId = null;
    },
  },
});

export const { setWeb3, setAccounts, setNetworkId, resetWeb3 } = web3Slice.actions;
export default web3Slice.reducer;
