// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
  "userSlice/getUserDetails",
  async () => {
    try {
      let userId = await localStorage.getItem("userId");

      console.log("function chala", userId);
      const response = await axios.post("/api/user/getUser", {
        userId: userId,
      });
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data.error || "Something went wrong");
    }
  }
);

export const signup = createAsyncThunk("userSlice/signup", async (userData) => {
  try {
    console.log("function chala signup wala");
    const response = await axios.post("/api/auth/signup", userData);
    localStorage.setItem("userId", response.data.data._id);

    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response.data.error || "Something went wrong");

    // return error.response.data;
  }
});

export const login = createAsyncThunk("userSlice/login", async (userData) => {
  try {
    console.log("function chala login wala ");
    const response = await axios.post("/api/auth/login", userData);
    console.log(response.data, "response ");
    localStorage.setItem("userId", response.data.data._id);

    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response.data.error || "Something went wrong");
  }
});


export const getPayments = createAsyncThunk("userSlice/getPayments", async () => {
  try {
    const userId=await localStorage.getItem("userId")
    console.log("function get payments", userId);
    const response = await axios.post("/api/payments/getUserPayments", {userId:userId});
    console.log(response, "response ");

    return response;
  } catch (error) {
    console.log(error,"===========");
    // @ts-ignore
    throw new Error(error.response.data.error || "Something went wrong");
  }
});

export const addCleanings = createAsyncThunk(
  "userSlice/addCleanings",
  async (data) => {
    try {
      let id = localStorage.getItem("userId");
      console.log("function chala cleaing add wala ");
      const response = await axios.post("/api/user/addCleanings", {
        service: data?.service,
        plan: data?.plan,
        time:data?.time,
        note:data?.note,
        userId: id,
      });
      console.log(response.data, "response ");

      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data.error || "Something went wrong");
    }
  }
);

export const skipThisWeek = createAsyncThunk(
  "userSlice/skipThisWeek",
  async (weekDates) => {
    try {
      let id = localStorage.getItem("userId");
      const response = await axios.post("/api/user/skipThisWeek", {
        weekDates: weekDates,
        userId: id,
      });
      console.log(response.data, "response ");

      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data.error || "Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    isUserLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload, "from store");
      state.user = action.payload;
    },
    setUserLogin: (state, action) => {
      state.isUserLogin = action.payload;
    },
    deleteUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUser, deleteUser, setUserLogin } = userSlice.actions;

export default userSlice.reducer;
