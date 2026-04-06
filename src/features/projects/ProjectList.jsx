import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "./projectSlice";
import Button from "../../components/common/Button";

function ProjectList({ onEdit, onView }) {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);
  const employees = useSelector(state => state.employee.employees);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const getEmployeeNames = (employeeIds) => {
    return employeeIds.map(id => {
      const emp = employees.find(e => e.id === id);
      return emp ? emp.name : 'Unknown';
    }).join(', ');
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No projects created yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={project.logo}
              alt={project.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Assigned Employees:</span>
            </p>
            <p className="text-sm text-gray-800">{getEmployeeNames(project.assignedEmployees)}</p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="secondary"
              className="text-xs px-3 py-1"
              onClick={() => onView(project)}
            >
              View
            </Button>
            <Button
              variant="primary"
              className="text-xs px-3 py-1"
              onClick={() => onEdit(project)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="text-xs px-3 py-1"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;