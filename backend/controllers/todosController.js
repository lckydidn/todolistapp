const TodosService = require("../services/todosService");

class TodosController {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const data = await TodosService.getAll(page || 1);
      res.status(200).json({
        message: "Successfully retrieved all tasks",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to retrieve tasks",
      });
    }
  }

  static async post(req, res) {
    try {
      const { title, task, completed, priority, dueDate } = req.body;
      const postTask = await TodosService.create({
        title,
        task,
        completed,
        priority,
        dueDate,
      });
      res.status(200).json({
        message: "Successfully created new task",
        postTask,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await TodosService.getOne(id);
      res.status(200).json({
        message: "Task found",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to retrieve task",
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { title, task, completed, priority, dueDate } = req.body;
      const updatedTask = await TodosService.update(id, {
        title,
        task,
        completed,
        priority,
        dueDate,
      });
      res.status(200).json({
        message: "Task updated successfully",
        updatedTask,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await TodosService.delete(id);
      res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

module.exports = TodosController;
