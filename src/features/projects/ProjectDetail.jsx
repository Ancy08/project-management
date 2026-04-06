import React from "react";
import { useSelector } from "react-redux";

function ProjectDetail({ project }) {
  const employees = useSelector((state) => state.employee.employees);

  const assignedEmployees = employees.filter((emp) =>
    project.assignedEmployees.includes(emp.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={project.logo}
          alt={project.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          <p className="text-gray-600">
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{project.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Assigned Employees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedEmployees.map((emp) => (
            <div key={emp.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={emp.profileImage}
                alt={emp.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{emp.name}</p>
                <p className="text-sm text-gray-600">{emp.position}</p>
                <p className="text-sm text-gray-600">{emp.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;