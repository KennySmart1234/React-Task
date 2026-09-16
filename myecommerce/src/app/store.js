// import {configureStore} from "@reduxjs/toolkit";
// import { dummyDataApi } from "../api/dummyDataApi";



// export const store = configureStore({
//     reduce = {
//         [dummyDataApi.reducerPath]: dummyDataApi.reducer,

//     },

  
// });



import { configureStore } from "@reduxjs/toolkit";
import { dummyDataApi } from "../api/dummyDataApi";

export const store = configureStore({
  reducer: {
    [dummyDataApi.reducerPath]: dummyDataApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyDataApi.middleware),
});



