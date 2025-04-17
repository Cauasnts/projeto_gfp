import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import RotasUsuarios from './Routes/RotasUsuarios.js'; // Controlador de usuários
import RotasSubcategorias from './Routes/RotasSubcategorias.js';
import RotasCategorias from './Routes/RotasCategorias.js';

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Middleware de autenticação
const autenticarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acesso negado, token não fornecido" });
  }

  try {
    const tokenSemBearer = token.split(" ")[1]; // Remove o 'Bearer'
    const verificado = jwt.verify(tokenSemBearer, 'chave-secreta'); // Valida o token
    req.usuario = verificado;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Token inválido" });
  }
};

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 API de Usuários rodando!");
});

// Rotas públicas
app.post("/usuarios", RotasUsuarios.novoUsuario); // Criar usuário
app.post("/usuarios/login", RotasUsuarios.login); // Login

// Rotas protegidas
app.get("/usuarios", autenticarToken, RotasUsuarios.listarUsuarios);
app.get("/usuarios/:id_usuario", autenticarToken, RotasUsuarios.listar);
app.put("/usuarios/:id_usuario", autenticarToken, RotasUsuarios.editarUsuarios);
app.delete("/usuarios/:id_usuario", autenticarToken, RotasUsuarios.deletarUsuarios);

//rotas de categorias
app.post("/categorias", autenticarToken, RotasCategorias.novaCategoria);
app.get("/categorias/:id_usuario", autenticarToken, RotasCategorias.listarCategorias);
app.put("/categorias/:id", autenticarToken, RotasCategorias.editarCategoria);
app.delete("/categorias/:id", autenticarToken, RotasCategorias.deletarCategoria);

// Rotas de subcategorias
app.post("/subcategorias", autenticarToken, RotasSubcategorias.novaSubcategoria);
app.get("/subcategorias/:id_usuario", autenticarToken, RotasSubcategorias.listarSubcategorias);
app.put("/subcategorias/:id", autenticarToken, RotasSubcategorias.editarSubcategoria);
app.delete("/subcategorias/:id", autenticarToken, RotasSubcategorias.deletarSubcategoria);

// Porta
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`✅ API rodando em http://localhost:${porta}`);
});
