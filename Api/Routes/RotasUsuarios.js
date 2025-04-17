import { BD } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "chave_api_gfp";

export function validarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
}3

class rotasUsuarios {
  static async novoUsuario(req, res) {
    const { nome, email, senha, tipo_acesso, ativo } = req.body;

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    try {
      const query = `insert into usuarios (nome, email, senha, tipo_acesso, ativo) values ($1, $2, $3, $4, $5)`;
      const valores = [nome, email, senhaCriptografada, tipo_acesso, ativo];
      const resposta = await BD.query(query, valores);

      res.status(201).json("usuario cadastrado");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  static async listarUsuarios(req, res) {
    try {
      const resposta = await BD.query(
        "select * from usuarios where ativo = true"
      );
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("erro ao listar usuarios ", error);
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
    }
  }

  static async listar(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        "select * from usuarios where ativo = true and id_usuario = $1",
        [id]
      );
      res.status(200).json(resposta.rows);
    } catch (error) {
      console.log("erro ao listar usuarios ", error);
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
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
        return res.status(400).json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update usuarios set ${campos.join(",")} where id_usuario=$${valores.length + 1} RETURNING *`;
      valores.push(id); // Adiciona o id no final dos valores
      const usuarios = await BD.query(query, valores);

      if (usuarios.rows.length === 0) {
        return res.status(404).json({ message: "usuario não encontrado" });
      }

      return res.status(200).json(usuarios.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "erro ao atualizar usuario", error: error.message });
    }
  }

  static async deletarUsuarios(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        "update usuarios set ativo = false where id_usuario=$1 ",
        [id]
      );
      res.status(200).json("usuario deletado com sucesso");
    } catch (error) {
      console.log("erro ao deletar usuario ", error);
      res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
    }
  }

  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const resultado = await BD.query(
        `SELECT id_usuario, nome, email, senha
        FROM usuarios
        WHERE email = $1`,
        [email]
      );

      if (resultado.rows.length === 0) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const usuario = resultado.rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json("Email ou senha inválidos");
      }

      const token = jwt.sign(
        { id_usuario: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Gerando refresh token
      const refreshToken = jwt.sign(
        { id_usuario: usuario.id_usuario },
        SECRET_KEY,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        refreshToken
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return res.status(500).json({ message: "Erro ao realizar login", erro: error.message });
    }
  }
}

export default rotasUsuarios;
