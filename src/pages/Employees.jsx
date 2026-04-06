import { useState } from "react";
import EmployeeForm from "../features/employees/EmployeeForm";
import EmployeeList from "../features/employees/EmployeeList";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

function Employees() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        <Button onClick={() => setShowForm(true)}>Add Employee</Button>
      </div>

      <EmployeeList />

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Employee"
      >
        <EmployeeForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}

export default Employees;