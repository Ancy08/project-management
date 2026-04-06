import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: []
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {

    // Create 
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        name: action.payload.title 
      });
    },

    // update make changes
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

    // Delete
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
  deleteProject   
} = projectSlice.actions;

export default projectSlice.reducer;