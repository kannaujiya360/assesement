import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import * as profileService from "../../services/profileService";

const tokenFromStorage = localStorage.getItem("token") || null;
const userFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

export const register = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const data = await authService.registerUser(payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const data = await authService.loginUser(payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, thunkAPI) => {
  try {
    const data = await profileService.fetchProfile();
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage,
    user: userFromStorage,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = { _id: action.payload._id, name: action.payload.name, email: action.payload.email };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = { _id: action.payload._id, name: action.payload.name, email: action.payload.email };
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
