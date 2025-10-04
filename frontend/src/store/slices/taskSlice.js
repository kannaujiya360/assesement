import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as taskService from "../../services/taskService";

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async (params = {}, thunkAPI) => {
  try {
    const data = await taskService.getTasks(params);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const addTask = createAsyncThunk("tasks/add", async (payload, thunkAPI) => {
  try {
    const data = await taskService.createTask(payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const removeTask = createAsyncThunk("tasks/remove", async (id, thunkAPI) => {
  try {
    const data = await taskService.deleteTask(id);
    return { id, data };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const updateTask = createAsyncThunk("tasks/update", async ({ id, payload }, thunkAPI) => {
  try {
    const data = await taskService.updateTask(id, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
    error: null,
    meta: { page: 1, limit: 10, total: 0 }
  },
  reducers: {
    clearTasks: (state) => {
      state.list = [];
      state.meta = { page: 1, limit: 10, total: 0 };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || action.payload; 
        state.meta = {
          page: action.payload.page || 1,
          limit: action.payload.limit || 10,
          total: action.payload.total || (action.payload.data ? action.payload.data.length : 0)
        };
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch tasks failed";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.meta.total = (state.meta.total || 0) + 1;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload.id);
        state.meta.total = Math.max((state.meta.total || 1) - 1, 0);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.list = state.list.map((t) => (t._id === action.payload._id ? action.payload : t));
      });
  }
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
