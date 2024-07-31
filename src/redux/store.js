import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import listReducer from "./reducers/listReducer";
import {listApi} from "./api/listApi";

export const store = configureStore({
    reducer: {
        list:listReducer,
        [listApi.reducerPath]: listApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(listApi.middleware)

});

setupListeners(store.dispatch);
