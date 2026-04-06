import React from "react";
import { useSelector } from "react-redux";

function TaskCard({ task, onEdit }) {
  const employees = useSelector(state => state.employee.employees);
  const projects = useSelector(state => state.project.projects);

  const assignedEmployee = employees.find(emp => emp.id === task.employeeId);
  const project = projects.find(p => p.id === task.projectId);

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onEdit && onEdit(task)}
    >
      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>

      <div className="space-y-1 mb-3">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Assigned:</span> {assignedEmployee?.name || "Unassigned"}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">ETA:</span> {task.eta}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Project:</span> {project?.title || "Unknown"}
        </p>
      </div>

      {task.referenceImage && (
        <img
          src={task.referenceImage}
          alt="Reference"
          className="w-full h-20 object-cover rounded"
        />
      )}
    </div>
  );
}

export default TaskCard;