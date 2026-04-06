import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employees/employeeSlice";
import projectReducer from "../features/projects/projectSlice";
import taskReducer from "../features/tasks/taskSlice"
export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    project:projectReducer,
    tasks:taskReducer
  }
});