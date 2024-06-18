import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "./base_url";

export const getTodo = createAsyncThunk("todoData/getTodo", async () => {
  try {
    const response = await axios.get(`${base_url}/todo`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const addTodo = createAsyncThunk(
  "todoData/addTodo",
  async (userData) => {
    try {
      const response = await axios.post(`${base_url}/todo`, userData);
      console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todoData/deleteTodo",
  async (id) => {
    try {
      const response = await axios.delete(`${base_url}/todo/${id}`);
      return id;
    } catch (error) {
      return error;
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todoData/updateTodo",
  async (userData) => {
    try {
      const response = await axios.put(
        `${base_url}/todo/${userData.id}`,
        userData
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const todoData = createSlice({
  name: "todoData",
  initialState: {
    todo: [],
    copytodo: [],
    loading: true,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todo = action.payload;
      state.copytodo = action.payload;
      state.error = "";
    });
    builder.addCase(getTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //add todo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todo.push(action.payload);
      console.log(action.payload);
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //delete
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todo = state.todo.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //update
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.todo = state.todo.map((ele) =>
        ele.id == action.payload.id ? action.payload : ele
      );
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {
    searchTodo: (state, action) => {
      state.todo = state.copytodo.filter((i) =>
        (i?.title + i?.description + i?.category)
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
    },
    sortTodo: (state, action) => {
      state.todo = state.copytodo.filter((i) => i.category == action.payload);
    },
    sortTodoAsc: (state) => {
      state.todo = state.copytodo.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
    },
    sortTodoDesc: (state) => {
      state.todo = state.copytodo.sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline)
      );
    },
  },
});

export default todoData.reducer;

export const { searchTodo, sortTodo, sortTodoAsc, sortTodoDesc } =
  todoData.actions;
