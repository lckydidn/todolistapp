const model = require("../models");

class UsersRepository {
  static async findAll(offset, limit) {
    return model.Users.findAll({ offset, limit });
  }

  static async findByEmail(email) {
    return model.Users.findOne({ where: { email } });
  }

  static async findById(id) {
    return model.Users.findByPk(id);
  }

  static async create(userData) {
    return model.Users.create(userData);
  }

  static async update(id, userData) {
    return model.Users.update(userData, { where: { id: parseInt(id) } });
  }

  static async delete(id) {
    return model.Users.destroy({ where: { id: parseInt(id) } });
  }
}

module.exports = UsersRepository;
