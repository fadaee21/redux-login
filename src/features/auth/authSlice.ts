import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialState, User } from "../../type";
import { RootState } from "../../store/configureStore";
import authService from "./authService";
import { AxiosError } from "axios";

const storedData = localStorage.getItem("user");
const user = storedData && JSON.parse(storedData);

const initialState: InitialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  err: undefined,
  counter: 0,
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkApi) => {
    try {
      return await authService.login(user); //this is returning payload
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        const errObj = error?.message;
        return thunkApi.rejectWithValue(errObj); //pass the message as action value
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token: string, thunkApi) => {
    try {
      return await authService.logout(token); //this is returning payload
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        const errObj = error?.message;
        return thunkApi.rejectWithValue(errObj); //pass the message as action value
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.err = undefined;
      state.isSuccess = false;
    },
    increment: (state) => {
      state.counter += 5;
    },
    decrement: (state) => {
      state.counter = 0;
    },
    //if only removing localStorage and you don't have logout api
    // logout: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("user");
    //   reset();
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.err = action.payload;
        state.user = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.err = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { reset, decrement, increment } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
