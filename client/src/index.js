import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER
} from "redux-persist"; // save state into local storage -> close tab, info still there unless clear cache -> login, data, etc.
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 }; // root is which persisted state will be stored,  storage from package represents default web storage used for persisting,  version to be persisted
const persistedReducer = persistReducer(persistConfig, authReducer); // create new reducer (function for how app state state should change) with previously defined config object and original state shown as authReducer from ./state
const store = configureStore({
  // resulting store object represents the configured Redux store with the persisted state and customized middleware
  // redux store is object that holds app state, allows state access, dispatch actions to store -> executes reducers that change states, updates state, notifies subscribers after updates
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [  FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER ]
      }
    })
// code sets up Redux state persistence using redux-persist, creates a new reducer that handles persistence, and configures a Redux store with the persisted reducer and customized middleware
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
    {/* Provider: Allows App to have access to Redux store created */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        {/* PersistGate: Ensure persisted state is loaded before rendering application -> restore state from local storage before rendering UI components */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
