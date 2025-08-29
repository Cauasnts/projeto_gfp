import { BD } from '../db.js';

class rotasPacientes {
  static async novoPacientes(req, res) {
    const { nome_usuario, data_de_nascimento, responsavel, endereco, telefone } = req.body;

    try {
      const resultado = await BD.query(
        `INSERT INTO paciente (nome_usuario, data_de_nascimento, responsavel, endereco, telefone)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome_usuario, data_de_nascimento, responsavel, endereco, telefone]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar paciente', error: error.message });
    }
  }

  static async listarPacientes(req, res) {
    try {
      const usuarios = await BD.query('SELECT * FROM paciente');
      res.status(200).json(usuarios.rows);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar pacientes', error: error.message });
    }
  }

static async atualizarPacientes(req, res) {
  const { id } = req.params;
  const { nome_paciente, data_de_nascimento, responsavel, endereco, telefone } = req.body;

  try {
    const resultado = await BD.query(
      `UPDATE paciente
       SET nome_paciente = $1, data_de_nascimento = $2, responsavel = $3, endereco = $4, telefone = $5
       WHERE id_paciente = $6
       RETURNING *`,
      [nome_paciente, data_de_nascimento, responsavel, endereco, telefone, id]
    );
    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar paciente', error: error.message });
  }
}


  static async deletarPacientes(req, res) {
    const { id } = req.params;
    try {
      const paciente = await BD.query('DELETE FROM paciente WHERE id_paciente = $1', [id]);
       return res.status(200).json({ message: 'Paciente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar paciente', error: error.message });
    }
  }
}

export default rotasPacientes;