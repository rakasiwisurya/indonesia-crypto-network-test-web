import { notif } from "@/app/libs/notification";
import { requestApi } from "@/app/libs/requestApi";
import { TAsyncThunkPayload } from "@/app/types/redux";
import { TTask, TTaskState } from "@/app/types/task";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addTask = createAsyncThunk(
  "task/addTask",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const response = await requestApi({
        method: "post",
        endpoint: `/tasks`,
        body: payload,
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const getTasks = createAsyncThunk("task/getTasks", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "get",
      endpoint: `/tasks`,
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

export const getTask = createAsyncThunk(
  "task/getTask",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const { id } = payload;

      const response = await requestApi({
        method: "get",
        endpoint: `/tasks/${id}`,
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const { id, ...data } = payload;

      const response = await requestApi({
        method: "put",
        endpoint: `/tasks/${id}`,
        body: data,
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (payload: TAsyncThunkPayload, thunkAPI) => {
    try {
      const { id } = payload;

      const response = await requestApi({
        method: "delete",
        endpoint: `/tasks/${id}`,
        body: payload,
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const generateTask = createAsyncThunk("task/generateTask", async (_, thunkAPI) => {
  try {
    const response = await requestApi({
      method: "post",
      endpoint: `/ai-suggestion`,
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
    return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
  }
});

const initialState: TTaskState = {
  tasks: [],
  isTasksLoading: true,
  tasksSuccess: null,
  tasksError: null,

  task: null,
  isTaskLoading: true,
  taskSuccess: null,
  taskError: null,

  isTaskAddLoading: false,
  taskAddSuccess: null,
  taskAddError: null,

  isTaskUpdateLoading: false,
  taskUpdateSuccess: null,
  taskUpdateError: null,

  isTaskDeleteLoading: false,
  taskDeleteSuccess: null,
  taskDeleteError: null,

  taskGenerate: {
    task_name: null,
    task_desc: null,
  },
  isTaskGenerateLoading: true,
  taskGenerateSuccess: null,
  taskGenerateError: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    resetAddTask: state => {
      state.isTaskAddLoading = false;
      state.taskAddSuccess = null;
      state.taskAddError = null;
    },
    resetTasks: state => {
      state.tasks = [];

      state.isTasksLoading = false;
      state.tasksSuccess = null;
      state.tasksError = null;
    },
    resetTask: state => {
      state.task = null;

      state.isTaskLoading = false;
      state.taskSuccess = null;
      state.taskError = null;
    },
    resetUpdateTask: state => {
      state.isTaskUpdateLoading = false;
      state.taskUpdateSuccess = null;
      state.taskUpdateError = null;
    },
    resetDeleteTask: state => {
      state.isTaskDeleteLoading = false;
      state.taskDeleteSuccess = null;
      state.taskDeleteError = null;
    },
    resetGenerateTask: state => {
      state.taskGenerate = {
        task_name: null,
        task_desc: null,
      };

      state.isTaskGenerateLoading = false;
      state.taskGenerateSuccess = null;
      state.taskGenerateError = null;
    },
  },
  extraReducers: builder => {
    return builder
      .addCase(addTask.pending, state => {
        state.taskAddSuccess = null;
        state.taskAddError = null;
        state.isTaskAddLoading = true;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.taskAddError = action.payload;
        state.isTaskAddLoading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        notif.success({ description: action.payload?.message || "Success" });

        state.taskAddSuccess = action.payload?.message;
        state.isTaskAddLoading = false;
      })

      .addCase(getTasks.pending, state => {
        state.tasksSuccess = null;
        state.tasksError = null;
        state.isTasksLoading = true;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.tasksError = action.payload;
        state.isTasksLoading = false;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.tasks = data.map((item: TTask) => ({
          ...item,
          key: `task-${item.id}`,
        }));

        state.tasksSuccess = action.payload?.message;
        state.isTasksLoading = false;
      })

      .addCase(getTask.pending, state => {
        state.taskSuccess = null;
        state.taskError = null;
        state.isTaskLoading = true;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.taskError = action.payload;
        state.isTaskLoading = false;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload.data;
        state.taskSuccess = action.payload?.message;
        state.isTaskLoading = false;
      })

      .addCase(updateTask.pending, state => {
        state.taskUpdateSuccess = null;
        state.taskUpdateError = null;
        state.isTaskUpdateLoading = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.taskUpdateError = action.payload;
        state.isTaskUpdateLoading = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        notif.success({ description: action.payload?.message || "Success" });

        state.taskUpdateSuccess = action.payload?.message;
        state.isTaskUpdateLoading = false;
      })

      .addCase(deleteTask.pending, state => {
        state.taskDeleteSuccess = null;
        state.taskDeleteError = null;
        state.isTaskDeleteLoading = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.taskDeleteError = action.payload;
        state.isTaskDeleteLoading = false;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        notif.success({ description: action.payload?.message || "Success" });

        state.taskDeleteSuccess = action.payload?.message;
        state.isTaskDeleteLoading = false;
      })

      .addCase(generateTask.pending, state => {
        state.taskGenerateSuccess = null;
        state.taskGenerateError = null;
        state.isTaskGenerateLoading = true;
      })
      .addCase(generateTask.rejected, (state, action) => {
        state.taskGenerateError = action.payload;
        state.isTaskGenerateLoading = false;
      })
      .addCase(generateTask.fulfilled, (state, action) => {
        state.taskGenerate = action.payload.data;
        state.taskGenerateSuccess = action.payload?.message;
        state.isTaskGenerateLoading = false;
      });
  },
});

export const {
  setTask,
  resetTasks,
  resetTask,
  resetAddTask,
  resetUpdateTask,
  resetDeleteTask,
  resetGenerateTask,
} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
