const bcrypt = require("bcrypt");
const UsersRepository = require("../repositories/usersRepository");
const { generateToken } = require("../lib/jwt");

class UsersService {
  static async getAll(page) {
    const limit = 10;
    const offset = (page - 1) * limit;
    return UsersRepository.findAll(offset, limit);
  }

  static async register({ email, password }) {
    if (!email || !password) {
      throw new Error("Invalid input");
    }

    const existingUser = await UsersRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    return UsersRepository.create({ email, password: hashPassword });
  }

  static async login({ email, password }) {
    const user = await UsersRepository.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("Wrong Password");
    }

    const token = generateToken({ id: user.id, email: user.email });
    return { token };
  }

  static async update(id, { email, password }) {
    if (!email || !password) {
      throw new Error("Invalid input");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    return UsersRepository.update(id, { email, password: hashPassword });
  }

  static async delete(id) {
    return UsersRepository.delete(id);
  }
}

module.exports = UsersService;
