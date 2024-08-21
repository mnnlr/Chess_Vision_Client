// src/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';

const rootReducer = combineReducers({
  login: loginReducer,
});

export const store = configureStore({reducer: rootReducer})
