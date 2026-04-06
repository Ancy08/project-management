# Project Management Dashboard

A comprehensive project management application built with React, Redux Toolkit, and modern web technologies. This dashboard provides full CRUD operations for managing employees, projects, and tasks with a drag-and-drop task board interface.

## Features

### Employee Management
- ✅ Create, View, Edit, Delete employees
- ✅ Profile image upload
- ✅ Unique email validation
- ✅ Position and contact information

### Project Management
- ✅ Create, View, Edit, Delete projects
- ✅ Project logo upload
- ✅ Start and end date/time management
- ✅ Assign multiple employees to projects
- ✅ Date validation (start < end)

### Task Management
- ✅ Create, View, Edit, Delete tasks
- ✅ Link tasks to existing projects
- ✅ Assign employees (only from project-assigned employees)
- ✅ ETA tracking
- ✅ Reference image upload
- ✅ Drag-and-drop task board with 5 columns:
  - Need to Do
  - In Progress
  - Need for Test
  - Completed
  - Re-open

### Dashboard Features
- ✅ Filter tasks by project
- ✅ Drag-and-drop functionality
- ✅ Responsive design
- ✅ Form validation with Yup
- ✅ Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 19 with Functional Components + Hooks
- **Routing**: React Router DOM v6+
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form + Yup validation
- **Drag & Drop**: @dnd-kit library
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── components/
│   └── common/                  # Reusable components
│       ├── Button.jsx
│       ├── Input.jsx
│       └── Modal.jsx
├── features/
│   ├── employees/               # Employee management
│   │   ├── EmployeeForm.jsx
│   │   ├── EmployeeList.jsx
│   │   └── employeeSlice.js
│   ├── projects/                # Project management
│   │   ├── ProjectForm.jsx
│   │   ├── ProjectList.jsx
│   │   ├── ProjectDetail.jsx
│   │   └── projectSlice.js
│   └── tasks/                   # Task management
│       ├── TaskBoard.jsx
│       ├── TaskCard.jsx
│       ├── TaskForm.jsx
│       └── taskSlice.jsx
├── pages/                       # Page components
│   ├── Employees.jsx
│   ├── ProjectsPage.jsx
│   └── tasksPage.jsx
├── routes/                      # (Future routing setup)
├── utils/                       # Utilities
│   └── validationSchemas.js
├── App.jsx                      # Main app component
├── main.jsx                     # App entry point
└── index.css                    # Global styles
```

## Usage

### Managing Employees
1. Navigate to the "Employees" page
2. Click "Add Employee" to create new employees
3. Use View/Edit/Delete buttons for existing employees
4. Upload profile images and ensure unique emails

### Managing Projects
1. Navigate to the "Projects" page
2. Click "Create Project" to add new projects
3. Assign employees to projects during creation
4. Set project timelines with validation

### Managing Tasks
1. Use the "Dashboard" (Task Board) for visual task management
2. Click "Add Task" to create new tasks
3. Select projects and assign employees (only project-assigned employees available)
4. Drag tasks between columns to update status
5. Filter tasks by project using the dropdown

## Validation Rules

- All required fields must be filled
- Email addresses must be valid and unique
- Project start dates must be before end dates
- Tasks can only be assigned to employees already assigned to the project
- All image uploads are validated

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Screenshots

*(Add screenshots here showing the dashboard, forms, and task board)*

## Live Demo

*(Add live demo link here if deployed)*
