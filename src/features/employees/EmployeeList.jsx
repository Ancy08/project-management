import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "./employeeSlice";
import EmployeeForm from "./EmployeeForm";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

function EmployeeList() {
  const employees = useSelector(
    (state) => state.employee?.employees || []
  );

  const dispatch = useDispatch();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="mt-5">
      <h3 className="text-xl font-semibold mb-3">Employee List</h3>

      {employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees added</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={emp.profileImage}
                  alt={emp.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{emp.name}</h4>
                  <p className="text-sm text-gray-600">{emp.position}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{emp.email}</p>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  className="text-xs px-2 py-1"
                  onClick={() => setViewingEmployee(emp)}
                >
                  View
                </Button>
                <Button
                  variant="primary"
                  className="text-xs px-2 py-1"
                  onClick={() => setEditingEmployee(emp)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="text-xs px-2 py-1"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Modal
        isOpen={!!viewingEmployee}
        onClose={() => setViewingEmployee(null)}
        title="Employee Details"
      >
        {viewingEmployee && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={viewingEmployee.profileImage}
                alt={viewingEmployee.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{viewingEmployee.name}</h3>
                <p className="text-gray-600">{viewingEmployee.position}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{viewingEmployee.email}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        title="Edit Employee"
      >
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      </Modal>
    </div>
  );
}

export default EmployeeList;