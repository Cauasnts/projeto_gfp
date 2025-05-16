import { BD } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "chave_api_gfp";

// Middleware para autenticação
export function validarToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
}

class RotasUsuarios {
  static async novoUsuario(req, res) {
    const { nome, email, senha, tipo_acesso } = req.body;
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    try {
      const query = `INSERT INTO usuarios (nome, email, senha, tipo_acesso) VALUES ($1, $2, $3, $4)`;
      const valores = [nome, email, senhaCriptografada, tipo_acesso];
      await BD.query(query, valores);

      res.status(201).json("Usuário cadastrado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const resposta = await BD.query("SELECT * FROM usuarios WHERE ativo = true");
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("Erro ao listar usuários", error);
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
    }
  }
  static async editarUsuariosPorId(req, res) {
    const { id_usuario } = req.params
    const { nome, email, senha, tipo_acesso } = req.body
    try {
      const campos = []
      const valores = []
      if (nome !== undefined) {
        campos.push(`nome = $${valores.length + 1}`)
        valores.push(nome)
      }

      if (email !== undefined) {
        campos.push(`email = $${valores.length + 1}`)
        valores.push(email)
      }

      if (senha !== undefined) {
        campos.push(`senha = $${valores.length + 1}`)
        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        valores.push(senha)
      }
      if (tipo_acesso !== undefined) {
        campos.push(`tipo_acesso = $${valores.length + 1}`)
        valores.push(tipo_acesso)
      }
      if (campos.length === 0) {
        return res.status(400).json({ mensagem: `nenhum campo fornecido` })
      }

      const query = `UPDATE usuarios SET ${campos.join(',')} WHERE id = ${id_usuario} RETURNING *`
      const usuario = await BD.query(comando, valores)

      if (rows.length === 0) {
        return res.status(404).json({ mensagem: `Usuário não encontrado` });
      }

      return res.status(200).json(rows[0]);

    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }

  static async listar(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        "SELECT * FROM usuarios WHERE ativo = true AND id_usuario = $1",
        [id]
      );
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("Erro ao listar usuário", error);
      res.status(500).json({ message: "Erro ao listar usuário", error: error.message });
    }
  }

  static async editarUsuarios(req, res) {
    const { id } = req.params;
    const { nome, email, senha, tipo_acesso, ativo } = req.body;
    const saltRounds = 10;

    try {
      const campos = [];
      const valores = [];

      if (nome !== undefined) {
        campos.push(`nome=$${valores.length + 1}`);
        valores.push(nome);
      }
      if (email !== undefined) {
        campos.push(`email=$${valores.length + 1}`);
        valores.push(email);
      }
      if (senha !== undefined) {
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        campos.push(`senha=$${valores.length + 1}`);
        valores.push(senhaCriptografada);
      }
      if (tipo_acesso !== undefined) {
        campos.push(`tipo_acesso=$${valores.length + 1}`);
        valores.push(tipo_acesso);
      }
      if (ativo !== undefined) {
        campos.push(`ativo=$${valores.length + 1}`);
        valores.push(ativo);
      }

      if (campos.length === 0) {
        return res.status(400).json({ message: "Nenhum campo fornecido para atualização" });
      }

      const query = `UPDATE usuarios SET ${campos.join(",")} WHERE id_usuario=$${valores.length + 1} RETURNING *`;
      valores.push(id);
      const usuarios = await BD.query(query, valores);

      if (usuarios.rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(usuarios.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
    }
  }

  static async deletarUsuarios(req, res) {
    const { id_usuario  } = req.params;
    try {
      const usuario = await BD.query("UPDATE usuarios SET ativo = false WHERE id_usuario=$1", [id_usuario]);
      res.status(200).json("Usuário Desativado com sucesso");
    } catch (error) {
      console.log("Erro ao Desativar usuário", error);
      res.status(500).json({ message: "Erro ao Desativar usuário", error: error.message });
    }
  }

  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const resultado = await BD.query(
        "SELECT * FROM usuarios WHERE email = $1 AND ativo = true",
        [email]
      );

      if (resultado.rows.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos " });

      }

      const usuario = resultado.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json("Email ou senha inválidos ");
      }

      const token = jwt.sign(
        { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
        SECRET_KEY,
        // { expiresIn: "1h" }
      );



      return res.status(200).json({
        token,
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo_acesso: usuario.tipo_acesso
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return res.status(500).json({ message: "Erro ao realizar login", erro: error.message });
    }
  }
}
export const autenticarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado, token não fornecido" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }

    req.usuario = usuario;
    next();
  });
};

export default RotasUsuarios;
