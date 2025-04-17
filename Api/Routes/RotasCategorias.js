const Categoria = require('../models/Categoria');

const RotasCategorias = {
  async novaCategoria(req, res) {
    try {
      const { nome, tipo_transacao, gasto_fixo, ativo } = req.body;
      const id_usuario = req.usuario.id;

      const nova = await Categoria.create({
        nome,
        tipo_transacao,
        gasto_fixo,
        ativo,
        id_usuario,
      });

      res.status(201).json(nova);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar categoria.' });
    }
  },

  async listarCategorias(req, res) {
    try {
      const { id_usuario } = req.params;
      const categorias = await Categoria.findAll({
        where: { id_usuario },
      });

      res.json(categorias);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar categorias.' });
    }
  },

  async editarCategoria(req, res) {
    try {
      const { id } = req.params;
      const { nome, tipo_transacao, gasto_fixo, ativo } = req.body;

      const categoria = await Categoria.findOne({
        where: { id_categoria: id },
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada.' });
      }

      await categoria.update({
        nome,
        tipo_transacao,
        gasto_fixo,
        ativo,
      });

      res.json(categoria);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao editar categoria.' });
    }
  },

  async deletarCategoria(req, res) {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findOne({
        where: { id_categoria: id },
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada.' });
      }

      await categoria.destroy();
      res.json({ mensagem: 'Categoria deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar categoria.' });
    }
  },
};

export default RotasCategorias;
