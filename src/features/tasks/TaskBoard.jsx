import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateTaskStatus } from "./taskSlice";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";

const columns = [
  { id: "need-to-do", title: "Need to Do", status: "need-to-do" },
  { id: "in-progress", title: "In Progress", status: "in-progress" },
  { id: "testing", title: "Testing", status: "testing" },
  { id: "completed", title: "Completed", status: "completed" },
  { id: "reopen", title: "Re-open", status: "reopen" },
];

function SortableItem({ task, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onEdit={onEdit} />
    </div>
  );
}

function TaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const projects = useSelector(state => state.project.projects);

  const [selectedProject, setSelectedProject] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = selectedProject
    ? tasks.filter(task => task.projectId === parseInt(selectedProject))
    : tasks;

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(task => task.status === status);
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

  
    const overColumn = columns.find(col => col.id === overId);
    if (overColumn) {
      // Dropped on a column
      dispatch(updateTaskStatus({ id: activeId, status: overColumn.status }));
    } else {
      // Dropped on another task - could implement reordering within column
      // For now, just update status if different column
      const activeTask = tasks.find(t => t.id === activeId);
      const overTask = tasks.find(t => t.id === overId);

      if (activeTask && overTask && activeTask.status !== overTask.status) {
        dispatch(updateTaskStatus({ id: activeId, status: overTask.status }));
      }
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
        <div className="flex space-x-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          <Button onClick={() => setShowForm(true)}>Add Task</Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-center">{column.title}</h3>
              <div className="space-y-2 min-h-[200px]">
                <SortableContext
                  items={getTasksByStatus(column.status).map(task => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {getTasksByStatus(column.status).map((task) => (
                    <SortableItem
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTask(null);
        }}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          existingTask={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default TaskBoard;