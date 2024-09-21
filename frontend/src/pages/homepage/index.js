import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTasks, updateTask, deleteTask } from "@/fetching/fetch";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import EditTaskModal from "@/pages/homepage/edit";
import AddTaskModal from "@/pages/homepage/add";

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      console.log("Fetched tasks:", fetchedTasks);
      setTasks(fetchedTasks);
    } catch (error) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    checkLogin();
    fetchTasks();
  }, []);

  const handleCheckboxClick = async (id, currentCompleted) => {
    const updatedCompleted = !currentCompleted;
    try {
      await updateTask(id, { completed: updatedCompleted });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: updatedCompleted } : task
        )
      );
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleAddTaskClick = () => {
    setShowAddModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4 ml-2 flex justify-between mr-2 mt-2'>
        List Todos:
        <div className='flex'>
          <Button onClick={handleAddTaskClick} className='mr-2'>
            Add Task
          </Button>
          <Button onClick={handleLogout} color='failure'>
            Logout
          </Button>
        </div>
      </h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {tasks.map((task) => (
          <Card key={task.id} href='#' className='max-w-sm p-4 ml-2 relative'>
            <div className='flex items-center mb-2'>
              <button
                onClick={() => handleCheckboxClick(task.id, task.completed)}
                className='focus:outline-none'
              >
                {task.completed ? (
                  <MdCheckBox className='text-green-500 text-xl' />
                ) : (
                  <MdCheckBoxOutlineBlank className='text-gray-500 text-xl' />
                )}
              </button>
              <h5
                className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-2 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </h5>
            </div>
            <p
              className={`font-normal text-gray-700 dark:text-gray-400 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.task}
            </p>
            <p
              className={`font-normal text-red-700 dark:text-gray-400 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              Priority: {task.priority}
            </p>
            <p
              className={`font-normal text-gray-700 dark:text-gray-400 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              Due Date: {new Date(task.dueDate).toISOString().split("T")[0]}
            </p>
            <div className='flex items-center absolute top-2 right-3'>
              <button onClick={() => handleEditClick(task)}>
                <FiEdit2 />
              </button>
            </div>
            <div className='flex items-center absolute bottom-2 right-3'>
              <button onClick={() => handleDeleteClick(task.id)}>
                <AiOutlineDelete />
              </button>
            </div>
          </Card>
        ))}
      </div>
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          showModal={showModal}
          setShowModal={setShowModal}
          refreshTasks={fetchTasks}
        />
      )}
      <AddTaskModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        refreshTasks={fetchTasks}
      />
    </div>
  );
};

export default Homepage;
