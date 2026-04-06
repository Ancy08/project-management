import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject } from "./projectSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const schema = yup.object({
  title: yup.string().required("Project title is required"),
  description: yup.string().required("Project description is required"),
  logo: yup.mixed().required("Project logo is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().min(yup.ref('startDate'), "End date must be after start date").required("End date is required"),
  assignedEmployees: yup.array().min(1, "At least one employee must be assigned").required("Employees must be assigned")
});

function ProjectForm({ existingProject, onClose }) {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);
  const [logoPreview, setLogoPreview] = useState(existingProject?.logo || "");

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...existingProject,
      assignedEmployees: existingProject?.assignedEmployees || []
    }
  });

  const assignedEmployees = watch("assignedEmployees") || [];

  const onSubmit = (data) => {
    const payload = {
      id: existingProject?.id || Date.now(),
      title: data.title,
      description: data.description,
      logo: logoPreview,
      startDate:new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      assignedEmployees: data.assignedEmployees
    };

    if (existingProject) {
      dispatch(updateProject(payload));
    } else {
      dispatch(addProject(payload));
    }

    onClose();
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result);
        setValue("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmployeeToggle = (employeeId) => {
    const current = assignedEmployees.includes(employeeId)
      ? assignedEmployees.filter(id => id !== employeeId)
      : [...assignedEmployees, employeeId];
    setValue("assignedEmployees", current);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Project Title"
        {...register("title")}
        error={errors.title?.message}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Description
        </label>
        <textarea
          {...register("description")}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={3}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Logo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 w-20 h-20 object-cover rounded"
          />
        )}
        {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>}
      </div>

      <Input
        label="Start Date & Time"
        type="datetime-local"
        {...register("startDate")}
        error={errors.startDate?.message}
      />

      <Input
        label="End Date & Time"
        type="datetime-local"
        {...register("endDate")}
        error={errors.endDate?.message}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assign Employees
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
          {employees.map(emp => (
            <label key={emp.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={assignedEmployees.includes(emp.id)}
                onChange={() => handleEmployeeToggle(emp.id)}
                className="rounded"
              />
              <span className="text-sm">{emp.name} ({emp.position})</span>
            </label>
          ))}
        </div>
        {errors.assignedEmployees && <p className="mt-1 text-sm text-red-600">{errors.assignedEmployees.message}</p>}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {existingProject ? "Update" : "Create"} Project
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;