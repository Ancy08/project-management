import React, { useState } from "react";
import ProjectForm from "../features/projects/ProjectForm";
import ProjectList from "../features/projects/ProjectList";
import ProjectDetail from "../features/projects/ProjectDetail";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewProject, setViewProject] = useState(null);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleView = (project) => {
    setViewProject(project);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-3">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <Button onClick={handleCreate}>Create Project</Button>
      </div>

      <ProjectList
        onEdit={handleEdit}
        onView={handleView}
      />

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingProject ? "Edit Project" : "Create New Project"}
      >
        <ProjectForm
          existingProject={editingProject}
          onClose={() => setShowForm(false)}
        />
      </Modal>

      <Modal
        isOpen={!!viewProject}
        onClose={() => setViewProject(null)}
        title="Project Details"
      >
        {viewProject && <ProjectDetail project={viewProject} />}
      </Modal>
    </div>
  );
}

export default ProjectsPage;