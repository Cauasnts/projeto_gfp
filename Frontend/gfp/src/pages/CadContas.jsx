import React, { useState, useContext, useEffect } from "react";
import { UsuarioContext } from "../UsuarioContext";
import { MdCreditCard, MdClose, MdSave } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Estilos from "../styles/Estilos";
import { enderecoServidor } from "../utils";

export default function CadContas() {
  const { dadosUsuario } = useContext(UsuarioContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [tipoConta, setTipoConta] = useState("CONTA_CORRENTE");
  const [saldoInicial, setSaldoInicial] = useState(0);

  const itemAlterar = location.state?.itemAlterar || null;

     useEffect(() => {
          if (itemAlterar) {
            setNome(itemAlterar.nome);
            setTipoConta(itemAlterar.tipo_conta);
            setSaldoInicial(itemAlterar.saldo);
          }
     }, [itemAlterar]);

  const botaoSalvar = async () => {
    if (nome.trim() == "") {
      alert("Informe o nome da conta");
      return;
    }

    const dados = {
      nome: nome,
      tipo_conta: tipoConta,
      saldo: parseFloat(saldoInicial),
      ativo: true,
    };

    try {
      let endpoint = `${enderecoServidor}/contas`;
      let metodo = "POST";

      if (itemAlterar) {
        endpoint = `${enderecoServidor}/contas/${itemAlterar.id_conta}`;
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
        alert("Conta salva com sucesso!");
        navigate("/contas");
      } else {
        const erro = await resposta.json();
        alert("Erro ao salvar conta: " + (erro.mensagem || "Tente novamente."));
      }
    } catch (error) {
      alert("Erro ao salvar conta: " + error.message);
      console.error("Erro ao salvar conta", error);
    }
  };

  return (
    <div className="flex justify-center py-6 px-4">
      <section className="w-full max-w-lg bg-white-500 p-8 rounded-lg shadow-lg text-white">
        {/* Cabeçalho */}
        <header className="flex items-center gap-2 mb-5 border-b border-gray-500 pb-4">
          <MdCreditCard className="text-cyan-600 h-8 w-8" />
          <h2 className="text-2xl font-bold text-gray-700">
               {itemAlterar ? "Alterar Conta" : "Nova Conta"}
          </h2>
        </header>

        {/* Formulário */}
        <div className="space-y-5">
          <label className={Estilos.labelCadastro}>Nome da Conta</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="ex.: Carteira"
            className={Estilos.inputCadastro}
          />

          <label className={Estilos.labelCadastro}>Tipo de Conta</label>
          <select
            value={tipoConta}
            onChange={(e) => setTipoConta(e.target.value)}
            className={Estilos.inputCadastro}
          >
            <option value="CONTA_CORRENTE">Conta Corrente</option>
            <option value="POUPANCA">Poupança</option>
            <option value="CARTAO_CREDITO">Conta Crédito</option>
            <option value="CARTAO_DEBITO">Conta Débito</option>
            <option value="DINHEIRO">Dinheiro</option>
            <option value="INVESTIMENTO">Investimento</option>
          </select>

          <label className={Estilos.labelCadastro}>Saldo Inicial</label>
          <input
            type="number"
            value={saldoInicial}
            onChange={(e) => setSaldoInicial(e.target.value)}
            className={Estilos.inputCadastro}
          />

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              className={Estilos.botaoOutline}
              onClick={() => navigate("/contas")}
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
