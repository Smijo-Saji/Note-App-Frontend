import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "./base_url";

export const createwithImg = createAsyncThunk(
  "withImgData/createwithImg",
  async (bodyData) => {
    try {
      const response = await axios.post(`${base_url}/withImg`, bodyData);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const showwithImg = createAsyncThunk("users/showwithImg", async () => {
  try {
    const response = await axios.get(`${base_url}/withImg`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deletewithImg = createAsyncThunk(
  "withImgData/deletewithImg",
  async (id) => {
    try {
      const response = await axios.delete(`${base_url}/withImg/${id}`);
      return id;
    } catch (error) {
      return error;
    }
  }
);

export const editwithImg = createAsyncThunk(
  "withImgData/editwithImg",
  async (bodyData) => {
    try {
      const response = await axios.put(
        `${base_url}/withImg/${bodyData.id}`,
        bodyData
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const withImgData = createSlice({
  name: "withImgData",
  initialState: {
    withImg: [],
    copywithImg: [],
    loading: true,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(createwithImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createwithImg.fulfilled, (state, action) => {
      state.loading = false;
      state.withImg.push(action.payload);
      state.error = "";
    });
    builder.addCase(createwithImg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //show
    builder.addCase(showwithImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showwithImg.fulfilled, (state, action) => {
      state.loading = false;
      state.withImg = action.payload;
      state.copywithImg = action.payload;
      state.error = "";
    });
    builder.addCase(showwithImg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //delte
    builder.addCase(deletewithImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletewithImg.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.withImg = state.withImg.filter((i) => i.id != action.payload);
    });
    builder.addCase(deletewithImg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //edit
    builder.addCase(editwithImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editwithImg.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.withImg = state.withImg.map((ele) =>
        ele.id == action.payload.id ? action.payload : ele
      );
    });
    builder.addCase(editwithImg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
  reducers: {
    searchwithImg: (state, action) => {
      state.withImg = state.copywithImg.filter((i) =>
        (i?.title).toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export default withImgData.reducer;

export const { searchwithImg } = withImgData.actions;
