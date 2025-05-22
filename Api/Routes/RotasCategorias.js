import { BD } from '../db.js';
import Categorias from '../models/Categorias.js';  // Ajuste o caminho conforme seu projeto

class RotasCategorias {
  
  // Criar categoria
  static async Nova(req, res) {
    try {
      const { id_categoria, nome, tipo_transacao, gasto_fixo, ativo } = req.body;

      const novaCategoria = await Categorias.create({
        nome,
        id_categoria,
        gasto_fixo,
        ativo,
        tipo_transacao,
      });

      res.status(201).json(novaCategoria);
    } catch (error) {
      console.log("Erro ao criar categoria", error);
      res.status(500).json({ erro: 'Erro ao criar categoria.' });
    }
  }

  // Listar todas categorias
  static async listarCategorias(req, res) {
    try {
      const categorias = await Categorias.findAll();
      res.json(categorias);
    } catch (error) {
      console.log("Erro ao listar categorias", error);
      res.status(500).json({ erro: 'Erro ao listar categorias.' });
    }
  }

  // Listar categoria por ID
  static async listarCategoriaPorID(req, res) {
    try {
      const { id_categoria } = req.params;
      const categoria = await Categorias.findOne({
        where: { id_categoria },
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada.' });
      }

      res.json(categoria);
    } catch (error) {
      console.log("Erro ao listar categoria por ID", error);
      res.status(500).json({ erro: 'Erro ao listar categoria.' });
    }
  }

  // Atualizar categoria
  static async atualizarCategorias(req, res) {
    try {
      const { id_categoria } = req.params;
      const { nome, tipo_transacao, gasto_fixo, ativo } = req.body;

      const categoria = await Categorias.findOne({
        where: { id_categoria },
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
      console.log("Erro ao atualizar categoria", error);
      res.status(500).json({ erro: 'Erro ao atualizar categoria.' });
    }
  }

  // Deletar categoria
  static async deletarCategoria(req, res) {
    try {
      const { id_categoria } = req.params;

      const categoria = await Categorias.findOne({
        where: { id_categoria },
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada.' });
      }

      await categoria.destroy();
      res.json({ mensagem: 'Categoria deletada com sucesso.' });
    } catch (error) {
      console.log("Erro ao deletar categoria", error);
      res.status(500).json({ erro: 'Erro ao deletar categoria.' });
    }
  }

  // Filtrar categorias por tipo_transacao e ativo
  static async filtrarCategorias(req, res) {
    const { tipo_transacao } = req.query;
    try {
      const query = `
        SELECT * FROM categorias
        WHERE tipo_transacao = $1 AND ativo = true
        ORDER BY nome DESC
      `;

      const resposta = await BD.query(query, [tipo_transacao]);
      return res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("Erro ao filtrar categorias", error);
      return res.status(500).json({ erro: "Erro ao filtrar categorias" });
    }
  }
}

export default RotasCategorias;

