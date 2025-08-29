import React, { useState, useContext, useEffect } from "react";
import { UsuarioContext } from "../UsuarioContext";
import { MdPerson, MdClose, MdSave } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Estilos from "../styles/Estilos";
import { enderecoServidor } from "../utils";

export default function CadFisioterapeutas() {
  const { dadosUsuario } = useContext(UsuarioContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [registro, setRegistro] = useState("");

  const itemAlterar = location.state?.itemAlterar || null;

  useEffect(() => {
    if (itemAlterar) {
      setNome(itemAlterar.nome);
      setCpf(itemAlterar.cpf);
      setEspecialidade(itemAlterar.especialidade);
      setRegistro(itemAlterar.registro);
    }
  }, [itemAlterar]);

  const botaoSalvar = async () => {
    if (
      nome.trim() === "" ||
      cpf.trim() === "" ||
      especialidade.trim() === "" ||
      registro.trim() === ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const dados = {
      nome,
      cpf,
      especialidade,
      registro,
      ativo: true,
    };

    try {
      let endpoint = `${enderecoServidor}/fisioterapeutas`;
      let metodo = "POST";

      if (itemAlterar) {
        endpoint = `${enderecoServidor}/fisioterapeutas/${itemAlterar.id_fisioterapeuta}`;
        metodo = "PUT";
      }

      const resposta = await fetch(endpoint, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        alert("Fisioterapeuta salvo com sucesso!");
        navigate("/fisioterapeutas");
      } else {
        const erro = await resposta.json();
        alert(
          "Erro ao salvar fisioterapeuta: " +
            (erro.mensagem || "Tente novamente.")
        );
      }
    } catch (error) {
      alert("Erro ao salvar fisioterapeuta: " + error.message);
      console.error("Erro ao salvar fisioterapeuta", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center py-6 px-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "" }}
    >
      <section className="w-full max-w-lg bg-white/90 p-8 rounded-lg shadow-lg">
        <header className="flex items-center gap-2 mb-5 border-b border-gray-300 pb-4">
          <MdPerson className="text-cyan-600 h-8 w-8" />
          <h2 className="text-2xl font-bold text-gray-700">
            {itemAlterar ? "Alterar Fisioterapeuta" : "Novo Fisioterapeuta"}
          </h2>
        </header>

        <div className="space-y-5">
          <label className={Estilos.labelCadastro}>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
            className={Estilos.inputCadastro}
          />

          <label className={Estilos.labelCadastro}>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            className={Estilos.inputCadastro}
          />

          <label className={Estilos.labelCadastro}>Especialidade</label>
          <input
            type="text"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            placeholder="Especialidade"
            className={Estilos.inputCadastro}
          />

          <label className={Estilos.labelCadastro}>Registro Profissional</label>
          <input
            type="text"
            value={registro}
            onChange={(e) => setRegistro(e.target.value)}
            placeholder="Registro"
            className={Estilos.inputCadastro}
          />

          <div className="flex justify-end gap-3 mt-8">
            <button
              className={Estilos.botaoOutline}
              onClick={() => navigate("/fisioterapeutas")}
            >
              <MdClose /> Cancelar
            </button>
            <button className={Estilos.botao} onClick={botaoSalvar}>
              <MdSave /> Salvar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
