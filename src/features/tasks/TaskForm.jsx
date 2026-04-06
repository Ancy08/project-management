import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "./taskSlice";

function TaskForm({ existingTask, onClose }) {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);
  const employees = useSelector(state => state.employee.employees);

  const [imagePreview, setImagePreview] = useState(existingTask?.referenceImage || "");

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      projectId: existingTask?.projectId || "",
      employeeId: existingTask?.employeeId || "",
      eta: existingTask?.eta || "",
      status: existingTask?.status || "need-to-do"
    }
  });

  useEffect(() => {
    if (existingTask) {
      setValue("status", existingTask.status);
    }
  }, [existingTask, setValue]);

  const selectedProjectId = watch("projectId");

  const selectedProject = projects.find(
    p => p.id === parseInt(selectedProjectId)
  );

  const availableEmployees = selectedProject
    ? employees.filter(emp =>
        selectedProject.assignedEmployees.includes(emp.id)
      )
    : [];

  const onSubmit = (data) => {
    const payload = {
      id: existingTask?.id || Date.now(),
      title: data.title,
      description: data.description,
      projectId: parseInt(data.projectId),
      employeeId: parseInt(data.employeeId),
      eta: data.eta,
      referenceImage: imagePreview,
      status: data.status 
    };

    if (existingTask) {
      dispatch(updateTask(payload));
    } else {
      dispatch(addTask(payload));
    }

    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <input placeholder="Title" {...register("title")} className="w-full p-2 border rounded" />

      <textarea placeholder="Description" {...register("description")} className="w-full p-2 border rounded" />

      <select {...register("projectId")} className="w-full p-2 border rounded">
        <option value="">Select Project</option>
        {projects.map(p => (
          <option key={p.id} value={p.id}>{p.title}</option>
        ))}
      </select>

      {/* STATUS */}
      <select {...register("status")} className="w-full p-2 border rounded">
        <option value="need-to-do">Need to Do</option>
        <option value="in-progress">In Progress</option>
        <option value="testing">Testing</option>
        <option value="completed">Completed</option>
        <option value="reopen">Reopen</option>
      </select>

      <select {...register("employeeId")} className="w-full p-2 border rounded">
        <option value="">Select Employee</option>
        {availableEmployees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>

      <input type="date" {...register("eta")} className="w-full p-2 border rounded" />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {existingTask ? "Update" : "Create"}
      </button>

    </form>
  );
}

export default TaskForm;