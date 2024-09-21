const model = require("../models");

class TodosRepository {
  static async findAll(offset, limit) {
    return model.Todos.findAll({ offset, limit });
  }

  static async findById(id) {
    return model.Todos.findByPk(id);
  }

  static async findByTitle(title) {
    return model.Todos.findOne({ where: { title } });
  }

  static async create(todoData) {
    return model.Todos.create(todoData);
  }

  static async update(todoInstance, todoData) {
    return todoInstance.update(todoData);
  }

  static async delete(id) {
    return model.Todos.destroy({ where: { id: parseInt(id) } });
  }
}

module.exports = TodosRepository;
