import { clearCookiesServer, setSessionServer } from "@/app/(server)/cookie";
import { userKey } from "@/app/assets/data/constants";
import { notif } from "@/app/libs/notification";
import { requestApi } from "@/app/libs/requestApi";
import { webStorage } from "@/app/libs/webStorage";
import { TAuthState } from "@/app/types/auth";
import { TAsyncThunkPayload } from "@/app/types/redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/auth/register`,
        body: payload,
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/auth/login`,
        body: payload,
      });

      const { token, ...data } = response.data.data;

      await setSessionServer(token);
      webStorage.set(userKey, data);

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await clearCookiesServer();
    thunkAPI.dispatch(signOut());
    webStorage.clear();
  } catch (error: any) {
    console.error(error);
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

const initialState: TAuthState = {
  user: null,
  isAppLoading: true,

  isLoginLoading: false,
  loginSuccess: null,
  loginError: null,

  isRegisterLoading: false,
  registerSuccess: null,
  registerError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAppLoading = false;
    },
    signOut: state => {
      state.user = null;
    },
    resetLogin: state => {
      state.isLoginLoading = false;
      state.loginError = null;
      state.loginSuccess = null;
    },
    resetRegister: state => {
      state.isRegisterLoading = false;
      state.registerError = null;
      state.registerSuccess = null;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(login.pending, state => {
        state.loginError = null;
        state.loginSuccess = null;
        state.isLoginLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoginLoading = false;
        state.loginSuccess = action.payload?.message;
        notif.success({ description: action.payload?.message || "Success" });
      })

      .addCase(register.pending, state => {
        state.registerError = null;
        state.registerSuccess = null;
        state.isRegisterLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegisterLoading = false;
        state.registerError = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.registerSuccess = action.payload?.message;
        notif.success({ description: action.payload?.message || "Success" });
      });
  },
});

export const { setUser, signOut, resetLogin, resetRegister } = authSlice.actions;
export const authReducer = authSlice.reducer;
