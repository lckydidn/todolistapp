const UsersService = require("../services/usersService");

class UsersController {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const data = await UsersService.getAll(page || 1);
      res.status(200).json({
        message: "Successfully retrieved all users",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to retrieve users",
      });
    }
  }

  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const data = await UsersService.register({ email, password });
      res.status(200).json({
        message: "Register Complete",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token } = await UsersService.login({ email, password });
      res.status(200).json({
        message: "Login Success",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const updatedUser = await UsersService.update(id, { email, password });
      res.status(200).json({
        message: "Data has been updated",
        updatedUser,
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
      await UsersService.delete(id);
      res.status(200).json({
        message: "Delete success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

module.exports = UsersController;
