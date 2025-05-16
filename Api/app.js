import express from 'express';
import cors from 'cors';

import * as RotasUsuarios from './Routes/RotasUsuarios.js';
import RotasCategorias from './Routes/RotasCategorias.js';
import RotasTransacoes from './Routes/RotasTransacoes.js';
import RotasContas from './Routes/RotasContas.js';
import RotasSubcategorias from './Routes/RotasSubcategorias.js';

const app = express();
const autenticarToken = RotasUsuarios.autenticarToken;
const Usuarios = RotasUsuarios.default;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 API de Usuários rodando!");
});

// Rotas públicas - Usuários
app.post("/usuarios", Usuarios.novoUsuario);
app.post("/usuarios/login", Usuarios.login);

// Rotas protegidas - Usuários
app.get("/usuarios", autenticarToken, Usuarios.listarUsuarios);
app.get("/usuarios/:id_usuario", autenticarToken, Usuarios.listar);
app.put("/usuarios/:id_usuario", autenticarToken, Usuarios.editarUsuarios);
app.delete("/usuarios/:id_usuario", autenticarToken, Usuarios.deletarUsuarios);

// Rotas Subcategorias
app.post("/subcategorias", autenticarToken, RotasSubcategorias.nova);
app.get("/subcategorias", autenticarToken, RotasSubcategorias.listar);
app.put("/subcategorias/:id", autenticarToken, RotasSubcategorias.editar);
app.delete("/subcategorias/:id", autenticarToken, RotasSubcategorias.deletar);

// Rotas Transações 
app.post("/transacoes", autenticarToken, RotasTransacoes.NovaTransacao);
app.get("/transacoes", autenticarToken, RotasTransacoes.listar);
app.get("/transacoes/filtroData", autenticarToken, RotasTransacoes.filtrarPorData);
app.get("/transacoes/:id_transacao", autenticarToken, RotasTransacoes.listarPorId);
app.put("/transacoes/:id_transacao", autenticarToken, RotasTransacoes.atualizar);
// app.put("/transacoes/:id_transacao", autenticarToken, RotasTransacoes.atualizarTodos);
app.delete("/transacoes/:id_transacao", autenticarToken, RotasTransacoes.deletar);
app.get("/transacoes/somarTransacao", autenticarToken, RotasTransacoes.somarTransacoes);

//Rotas Categorias
app.post("/categorias", autenticarToken, RotasCategorias.Nova);
app.get("/categorias", autenticarToken, RotasCategorias.listarCategorias);
app.get("/categorias/:id_categoria", autenticarToken, RotasCategorias.listarCategoriaPorID);
app.put("/categorias/:id_categoria", autenticarToken, RotasCategorias.atualizarCategorias);
// app.put("/categorias/:id_categoria", autenticarToken, RotasCategorias.atualizarTodasCategorias);
app.delete("/categorias/:id_categoria", autenticarToken, RotasCategorias.deletarCategoria);
app.get("/categorias/filtro", autenticarToken, RotasCategorias.filtrarCategorias);
// Rotas Contas 
app.post("/contas", autenticarToken, RotasContas.novaConta);
app.get("/contas", autenticarToken, RotasContas.listarContas);
app.get("/contas/:id_conta", autenticarToken, RotasContas.listarContaPorID);
app.put("/contas/:id_conta", autenticarToken, RotasContas.atualizarContas);
// app.put("/contas/:id_conta", autenticarToken, RotasContas.atualizarTodasContas);
app.delete("/contas/:id_conta", autenticarToken, RotasContas.deletarConta);

// Porta do servidor
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`✅ API rodando em http://localhost:${porta}`);
});

export default app;
