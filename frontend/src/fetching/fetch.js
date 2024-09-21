import instance from "@/lib/axios";

export const loginUser = async (email, password) => {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Invalid credentials");
    throw error;
  }
};

export const getTasks = async (page = 1) => {
  try {
    const response = await instance.get(`/todos?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to get tasks", error);
    throw error;
  }
};

export const createTask = async ({
  title,
  task,
  completed,
  priority,
  dueDate,
}) => {
  try {
    const response = await instance.post("/todos", {
      title,
      task,
      completed,
      priority,
      dueDate,
    });
    console.log("Response:", response);
    return response.data.postTask;
  } catch (error) {
    console.error("Failed to create task", error);
    throw error;
  }
};

export const statusTask = async (id, updates) => {
  try {
    const response = await instance.put(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Failed to update task", error);
    throw error;
  }
};

export const updateTask = async (
  id,
  { title, task, completed, priority, dueDate }
) => {
  try {
    const response = await instance.put(`/todos/${id}`, {
      title,
      task,
      completed,
      priority,
      dueDate,
    });
    console.log("Response:", response);
    return response.data.updatedTask;
  } catch (error) {
    console.error("Failed to update task", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    console.log(`Deleting task with ID: ${id}`);
    const response = await instance.delete(`/todos/${id}`);
    console.log("Response:", response);
  } catch (error) {
    console.error("Failed to delete task", error);
    throw error;
  }
};
