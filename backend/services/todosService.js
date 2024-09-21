const TodosRepository = require("../repositories/todosRepository");

class TodosService {
  static async getAll(page) {
    const limit = 10;
    const offset = (page - 1) * limit;
    return TodosRepository.findAll(offset, limit);
  }

  static async getOne(id) {
    return TodosRepository.findById(id);
  }

  static async create({ title, task, completed = false, priority, dueDate }) {
    if (!title || !task) {
      throw new Error("Invalid input");
    }

    const existingTask = await TodosRepository.findByTitle(title);
    if (existingTask) {
      throw new Error("Task already exists");
    }

    return TodosRepository.create({
      title,
      task,
      completed,
      priority,
      dueDate,
    });
  }

  static async update(id, { title, task, completed, priority, dueDate }) {
    if (!title && !task && completed === undefined && !priority && !dueDate) {
      throw new Error("No fields to update");
    }

    const taskToUpdate = await TodosRepository.findById(id);
    if (!taskToUpdate) {
      throw new Error("Task not found");
    }

    return TodosRepository.update(taskToUpdate, {
      title: title || taskToUpdate.title,
      task: task || taskToUpdate.task,
      completed: completed !== undefined ? completed : taskToUpdate.completed,
      priority: priority || taskToUpdate.priority,
      dueDate: dueDate || taskToUpdate.dueDate,
    });
  }

  static async delete(id) {
    const deleteTask = await TodosRepository.delete(id);
    if (!deleteTask) {
      throw new Error("Task not found");
    }

    return deleteTask;
  }
}

module.exports = TodosService;
