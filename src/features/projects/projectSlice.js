import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: []
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {

    // ✅ CREATE
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        name: action.payload.title // map title → name
      });
    },

    // ✅ UPDATE
    updateProject: (state, action) => {
      const index = state.projects.findIndex(
        p => p.id === action.payload.id
      );

      if (index !== -1) {
        state.projects[index] = {
          ...action.payload,
          name: action.payload.title
        };
      }
    },

    // ✅ DELETE
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        p => p.id !== action.payload
      );
    }

  }
});

export const {
  addProject,
  updateProject,
  deleteProject   // 🔥 NOW EXISTS
} = projectSlice.actions;

export default projectSlice.reducer;