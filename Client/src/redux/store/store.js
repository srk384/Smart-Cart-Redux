import { configureStore } from "@reduxjs/toolkit";
import { productDataApi } from "../APIs/productDataApi";
import { authApi } from "../APIs/authAPI";
import productDataReducer from "../slices/productDataSlice";

export const store = configureStore({
  reducer: {
    productData: productDataReducer,
    [productDataApi.reducerPath]: productDataApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productDataApi.middleware, authApi.middleware),
});
