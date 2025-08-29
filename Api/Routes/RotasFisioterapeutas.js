import { BD } from '../db.js';

class rotasFisioterapeuta {
  static async novoFisioterapeuta(req, res) {
    const { nome, especialidade, data_de_nascimento } = req.body;

    try {
      const resultado = await BD.query(
        `INSERT INTO fisioterapeuta (nome, especialidade, data_de_nascimento)
         VALUES ($1, $2, $3) RETURNING *`,
        [nome, especialidade, data_de_nascimento]
      );
      return res.status(201).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar fisioterapeuta', error: error.message });
    }
  }

  static async listarFisioterapeutas (req, res) {
    try {
      const resultado = await BD.query('SELECT * FROM fisioterapeuta');
      res.status(200).json(resultado.rows);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar fisioterapeutas', error: error.message });
    }
  }

  static async atualizarFisioterapeuta(req, res) {
    const { id } = req.params;
    const { nome, especialidade, data_de_nascimento } = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE fisioterapeuta SET nome = $1, especialidade = $2, data_de_nascimento = $3
         WHERE id_fisioterapeuta = $4 RETURNING *`,
        [nome, especialidade, data_de_nascimento, id]
      );
      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar fisioterapeuta', error: error.message });
    }
  }

  static async deletarFisioterapeuta(req, res) {
    const { id } = req.params;
    try {
      await BD.query('DELETE FROM fisioterapeuta WHERE id_fisioterapeuta = $1', [id]);
      res.status(200).json({ message: 'Fisioterapeuta deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar fisioterapeuta', error: error.message });
    }
  }
}

export default rotasFisioterapeuta;
