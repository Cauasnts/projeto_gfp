import { BD } from '../db.js';

class RotasSubcategorias {

  static async nova(req, res) {
    try {
      const { nome, id_categoria, gasto_fixo, ativo } = req.body;
      const id_usuario = req.usuario.id;

      const sql = `
        INSERT INTO subcategorias (nome, id_categoria, gasto_fixo, ativo, id_usuario)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const params = [nome, id_categoria, gasto_fixo, ativo, id_usuario];
      const resultado = await BD.query(sql, params);

      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      console.error("Erro ao criar subcategoria:", error);
      res.status(500).json({ erro: 'Erro ao criar subcategoria.' });
    }
  }

  static async listar(req, res) {
    try {
      const { id_usuario } = req.params;

      const sql = `SELECT * FROM subcategorias WHERE id_usuario = $1`;
      const resultado = await BD.query(sql, [id_usuario]);

      res.json(resultado.rows);
    } catch (error) {
      console.error("Erro ao listar subcategorias:", error);
      res.status(500).json({ erro: 'Erro ao listar subcategorias.' });
    }
  }

  static async editar(req, res) {
    try {
      const { id } = req.params;
      const { nome, id_categoria, gasto_fixo, ativo } = req.body;

      // Verifica se existe
      const consulta = await BD.query(
        `SELECT * FROM subcategorias WHERE id_subcategoria = $1`,
        [id]
      );

      if (consulta.rows.length === 0) {
        return res.status(404).json({ erro: 'Subcategoria não encontrada.' });
      }

      // Atualiza
      await BD.query(
        `UPDATE subcategorias SET nome = $1, id_categoria = $2, gasto_fixo = $3, ativo = $4 WHERE id_subcategoria = $5`,
        [nome, id_categoria, gasto_fixo, ativo, id]
      );

      // Retorna atualizado
      const atualizado = await BD.query(
        `SELECT * FROM subcategorias WHERE id_subcategoria = $1`,
        [id]
      );
      res.json(atualizado.rows[0]);
    } catch (error) {
      console.error("Erro ao editar subcategoria:", error);
      res.status(500).json({ erro: 'Erro ao editar subcategoria.' });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;

      const consulta = await BD.query(
        `SELECT * FROM subcategorias WHERE id_subcategoria = $1`,
        [id]
      );

      if (consulta.rows.length === 0) {
        return res.status(404).json({ erro: 'Subcategoria não encontrada.' });
      }

      await BD.query(
        `DELETE FROM subcategorias WHERE id_subcategoria = $1`,
        [id]
      );

      res.json({ mensagem: 'Subcategoria deletada com sucesso.' });
    } catch (error) {
      console.error("Erro ao deletar subcategoria:", error);
      res.status(500).json({ erro: 'Erro ao deletar subcategoria.' });
    }
  }
}

export default RotasSubcategorias;
