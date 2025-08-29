import { BD } from '../db.js';

class rotasAgenda {
  static async novaAgenda(req, res) {
    const { nome_paciente, patologia, data_de_nascimento, quantidade_de_secao, id_paciente, id_fisioterapeuta } = req.body;

    try {
      const resultado = await BD.query(
        `INSERT INTO agenda (nome_paciente, patologia, data_de_nascimento, quantidade_de_secao, id_paciente, id_fisioterapeuta)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [nome_paciente, patologia, data_de_nascimento, quantidade_de_secao, id_paciente, id_fisioterapeuta]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar agenda', error: error.message });
    }
  }

  static async listarAgenda(req, res) {
    try {
      const resultado = await BD.query('SELECT * FROM agenda');
      res.status(200).json(resultado.rows);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar agendas', error: error.message });
    }
  }

  static async atualizarAgenda(req, res) {
    const { id } = req.params;
    const { nome_paciente, patologia, data_de_nascimento, quantidade_de_secao, id_paciente, id_fisioterapeuta } = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE agenda SET nome_paciente = $1, patologia = $2, data_de_nascimento = $3,
         quantidade_de_secao = $4, id_paciente = $5, id_fisioterapeuta = $6
         WHERE id_agenda = $7 RETURNING *`,
        [nome_paciente, patologia, data_de_nascimento, quantidade_de_secao, id_paciente, id_fisioterapeuta, id]
      );
      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar agenda', error: error.message });
    }
  }

  static async deletarAgenda(req, res) {
    const { id } = req.params;
    try {
      await BD.query('DELETE FROM agenda WHERE id_agenda = $1', [id]);
      res.status(200).json({ message: 'Agenda deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar agenda', error: error.message });
    }
  }
}

export default rotasAgenda;