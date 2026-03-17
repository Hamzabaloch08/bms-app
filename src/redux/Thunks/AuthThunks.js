import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", payload);
      if (response.data?.token) {
        await AsyncStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.log("Backend error data:", error.response?.data);
      const data = error.response?.data;
      return rejectWithValue(
        data?.message || data?.error || data?.msg || error.message,
      );
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "/user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  "/auth/change-password",
  async ({ oldPassword, newPassword, token }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        "/auth/change-password",
        { oldPassword, newPassword },
        {
          headers: { token },
        },
      );
      return data;
    } catch (error) {
      console.log("Backend error data:", error.response?.data);
      const data = error.response?.data;
      return rejectWithValue(
        data?.message || data?.error || data?.msg || error.message,
      );
    }
  },
);

export const sendResetPasswordEmail = createAsyncThunk(
  "/auth/getVerificationEmailForForgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/getVerificationEmailForForgetPassword",
        { email },
      );
      return response.data;
    } catch (error) {
      console.log("Backend error data:", error.response?.data);
      const data = error.response?.data;
      return rejectWithValue(
        data?.message || data?.error || data?.msg || error.message,
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "/auth/verifyOtp",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verifyOtp", {
        email,
        otp,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.log("Backend error data:", error.response?.data);
      const data = error.response?.data;
      return rejectWithValue(
        data?.message || data?.error || data?.msg || error.message,
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const response = await api.get("/auth/logout", {
        headers: {
          userid: user._id,
        },
      });

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
