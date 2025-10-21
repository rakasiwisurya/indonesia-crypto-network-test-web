import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { taskReducer } from "../features/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
