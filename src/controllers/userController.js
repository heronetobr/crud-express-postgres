const userModel = require('../models/userModel');

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await userModel.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  create: async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: 'Nome e e-mail são obrigatórios' });
      }

      const newUser = await userModel.create(name, email);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message, detail: error.detail });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: 'Nome e e-mail são obrigatórios' });
      }

      const updatedUser = await userModel.update(id, name, email);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await userModel.delete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
};

module.exports = userController;