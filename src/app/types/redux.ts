import store from "../redux/app/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TAsyncThunkPayload = any | undefined;

export type TResetAction = { payload?: { isLoadingOnly: boolean }; type: string };
