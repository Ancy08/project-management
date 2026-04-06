import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task
      );
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.status = status;
      }
    }
  }
});

export const { addTask, updateTask, deleteTask, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;