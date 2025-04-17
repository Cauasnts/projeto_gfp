const Subcategoria = require('../models/Subcategoria');

const RotasSubcategorias = {
  async novaSubcategoria(req, res) {
    try {
      const { nome, id_categoria, gasto_fixo, ativo } = req.body;
      const id_usuario = req.usuario.id;

      const nova = await Subcategoria.create({
        nome,
        id_categoria,
        gasto_fixo,
        ativo,
        id_usuario,
      });

      res.status(201).json(nova);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar subcategoria.' });
    }
  },

  async listarSubcategorias(req, res) {
    try {
      const { id_usuario } = req.params;
      const subcategorias = await Subcategoria.findAll({
        where: { id_usuario },
      });

      res.json(subcategorias);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar subcategorias.' });
    }
  },

  async editarSubcategoria(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_categoria, gasto_fixo, ativo } = req.body;

      const subcategoria = await Subcategoria.findOne({
        where: { id_subcategoria: id },
      });

      if (!subcategoria) {
        return res.status(404).json({ erro: 'Subcategoria não encontrada.' });
      }

      await subcategoria.update({
        nome,
        id_categoria,
        gasto_fixo,
        ativo,
      });

      res.json(subcategoria);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao editar subcategoria.' });
    }
  },

  async deletarSubcategoria(req, res) {
    try {
      const { id } = req.params;

      const subcategoria = await Subcategoria.findOne({
        where: { id_subcategoria: id },
      });

      if (!subcategoria) {
        return res.status(404).json({ erro: 'Subcategoria não encontrada.' });
      }

      await subcategoria.destroy();
      res.json({ mensagem: 'Subcategoria deletada com sucesso.' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar subcategoria.' });
    }
  },
};

export default RotasSubcategorias;
