import { BD } from '../db.js';


class RotasSubcategorias {
  async nova(req, res) {
    try {
      const { nome, id_categoria, gasto_fixo, ativo } = req.body;
      const id_usuario = req.usuario.id; // Certifique que esse middleware está setando req.usuario

      const nova = await Subcategoria.create({
        nome,
        id_categoria,
        gasto_fixo,
        ativo,
        id_usuario,
      });

      res.status(201).json(nova);
    } catch (error) {
      console.error("Erro ao criar subcategoria:", error);
      res.status(500).json({ erro: 'Erro ao criar subcategoria.' });
    }
  }

  async listar(req, res) {
    try {
      const { id_usuario } = req.params;

      const subcategorias = await subcategorias.findAll({
        where: { id_usuario },
      });

      res.json(subcategorias);
    } catch (error) {
      console.error("Erro ao listar subcategorias:", error);
      res.status(500).json({ erro: 'Erro ao listar subcategorias.' });
    }
  }

  async editar(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_categoria, gasto_fixo, ativo } = req.body;

      const subcategoria = await subcategoria.findOne({
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
      console.error("Erro ao editar subcategoria:", error);
      res.status(500).json({ erro: 'Erro ao editar subcategoria.' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const subcategoria = await subcategoria.findOne({
        where: { id_subcategoria: id },
      });

      if (!subcategoria) {
        return res.status(404).json({ erro: 'Subcategoria não encontrada.' });
      }

      await subcategoria.destroy();
      res.json({ mensagem: 'Subcategoria deletada com sucesso.' });
    } catch (error) {
      console.error("Erro ao deletar subcategoria:", error);
      res.status(500).json({ erro: 'Erro ao deletar subcategoria.' });
    }
  }
}

export default RotasSubcategorias;
