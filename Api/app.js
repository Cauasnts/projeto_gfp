import express from "express";
import { testarConexao } from "./db.js";
import cors from "cors";

import rotasAgenda from "./Routes/RotasAgendas.js"
import rotasFisioterapeuta from "./Routes/RotasFisioterapeutas.js"
import rotasPacientes from "./Routes/RotasPacientes.js"

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';


const app = express();

testarConexao();
app.use(express.json());
app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    // res.send("API rodando!");    
    res.redirect('/api-docs');
});


// ================= ROTAS PACIENTES =================
app.get('/pacientes', rotasPacientes.listarPacientes);
app.post('/pacientes', rotasPacientes.novoPacientes);
app.delete('/pacientes/:id', rotasPacientes.deletarPacientes);
app.put('/pacientes/:id', rotasPacientes.atualizarPacientes);
// ================= ROTAS AGENDA =================
app.get('/agendas', rotasAgenda.listarAgenda);
app.post('/agendas', rotasAgenda.novaAgenda);
app.delete('/agendas', rotasAgenda.deletarAgenda);
app.put('/agendas', rotasAgenda.atualizarAgenda);
// ================= ROTAS FISIOTERAPEUTA =================
app.get('/fisioterapeutas', rotasFisioterapeuta.novoFisioterapeuta);
app.post('/fisioterapeutas', rotasFisioterapeuta.listarFisioterapeutas);
app.delete('/fisioterapeutas/:id', rotasFisioterapeuta. deletarFisioterapeuta);
app.put('/fisioterapeutas/:id', rotasFisioterapeuta.atualizarFisioterapeuta);
const porta = 3000;
app.listen(porta, () => {
    console.log(`Api rodando em http://localhost:${porta}`);
});