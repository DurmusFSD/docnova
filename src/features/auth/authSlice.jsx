import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login/dev", credentials);

      console.log("Login başarılı, response:", response);
      return response.data;
    } catch (err) {
      console.log("Login hatası:", err);
      return rejectWithValue(err.response?.data?.message || "Giriş başarısız");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    jwt: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.jwt = action.payload.jwt;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
