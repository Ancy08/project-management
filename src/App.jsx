import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Employees from "./pages/Employees";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/tasksPage";
import TaskBoard from "./features/tasks/TaskBoard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='bg-blue-200 min-h-screen'>
          <nav className="shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">Project Management Dashboard</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/"
                      className="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/employees"
                      className="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Employees
                    </Link>
                    <Link
                      to="/projects"
                      className="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Projects
                    </Link>
                    <Link
                      to="/tasks"
                      className="border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Tasks
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
         <div className='bg-blue-500/70 backdrop-blur-lg rounded-2xl shadoww-lg p-6'> </div>
            <Routes>
              <Route path="/" element={<TaskBoard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;