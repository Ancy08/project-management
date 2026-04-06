import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "./employeeSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  position: yup.string().required("Position is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  profileImage: yup.mixed().required("Profile image is required")
});

function EmployeeForm({ employee, onClose }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const [imagePreview, setImagePreview] = useState(employee?.profileImage || "");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: employee || {}
  });

  const onSubmit = (data) => {
    // Check for duplicate email
    const duplicate = employees.some(
      (emp) => emp.email.toLowerCase() === data.email.toLowerCase() && emp.id !== employee?.id
    );

    if (duplicate) {
      alert("An employee with this email already exists!");
      return;
    }

    const employeeData = {
      ...data,
      profileImage: imagePreview
    };

    if (employee) {
      dispatch(updateEmployee({ ...employeeData, id: employee.id }));
    } else {
      // Generate a unique ID
      const newId = Math.max(...employees.map(emp => emp.id), 0) + 1;
      dispatch(addEmployee({ ...employeeData, id: newId }));
    }

    if (onClose) onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Position"
        {...register("position")}
        error={errors.position?.message}
      />

      <Input
        label="Official Email ID"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="mt-2 w-20 h-20 object-cover rounded-full"
          />
        )}
        {errors.profileImage && <p className="mt-1 text-sm text-red-600">{errors.profileImage.message}</p>}
      </div>

      <div className="flex justify-end space-x-2">
        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {employee ? "Update" : "Add"} Employee
        </Button>
      </div>
    </form>
  );
}

export default EmployeeForm;