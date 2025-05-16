import { BD } from '../db.js';

class RotasCategorias {
  // Criar categoria
  async criarCategoria(req, res) {
    try {
      const { id_categoria, nome, tipo_transacao, gasto_fixo, ativo } = req.body;

      const novaCategoria = await id_categoria.create({
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
  
  static async filtrarCategorias(req, res) {
    const { tipo_transacao } = req.params;
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

  // Listar por id_categoria
  async listarCategorias(req, res) {
    try {
      const { id_categoria } = req.params;
      const categorias = await categorias.findAll({
        where: { id_categoria },
      });

      res.json(categorias);
    } catch (error) {
      console.log("Erro ao listar categorias", error);
      res.status(500).json({ erro: 'Erro ao listar categorias.' });
    }
  }

  // Editar categoria
  async editarCategorias(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_categoria, gasto_fixo, ativo, tipo_transacao } = req.body;

      const categoria = await Categorias.findOne({
        where: { id_categoria: id },
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada.' });
      }

      await categoria.update({
        nome,
        tipo_transacao,
        id_categoria,
        gasto_fixo,
        ativo,
      });

      res.json(categoria);
    } catch (error) {
      console.log("Erro ao editar categoria", error);
      res.status(500).json({ erro: 'Erro ao editar categoria.' });
    }
  }

  // Deletar categoria
  async deletarCategorias(req, res) {
    try {
      const { id } = req.params;

      const categoria = await categoria.findOne({
        where: { id_categoria: id },
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
}

export default RotasCategorias;
 