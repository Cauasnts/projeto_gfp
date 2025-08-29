import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import {
  MdAdd,
  MdCached,
  MdClose,
  MdGridView,
  MdLogout,
  MdPeople,
  MdOutlineLocalOffer,
  MdCreditCard,
  MdMenu,
  MdViewAgenda,
  MdCandlestickChart,
} from "react-icons/md";
import styles from "../styles/Estilos.jsx";
import Agendas from "./Agendas.jsx";
import CadAgendas from "./CadAgenda.jsx"; 
import CadFisioterapeutas from "./CadFisioterapeutas.jsx";
import Fisioterapeutas from "./Fisioterapeutas.jsx";

export default function Principal() {
  const { dadosUsuario, setDadosUsuario, carregando } =
    useContext(UsuarioContext);

  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!dadosUsuario && !carregando) {
      navigate("/login");
    }
  }, [dadosUsuario, carregando, navigate]);

  const botaoLogout = () => {
    try {
      localStorage.removeItem("UsuarioLogado");
      setDadosUsuario(null);
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-b from-[#2c3e50] to-[#3498db]">
      {/* Overlay para mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-80 z-30 md:hidden ${
          menuAberto ? "block" : "hidden"
        }`}
        onClick={() => setMenuAberto(false)}
      />

      {/* Sidebar */}
      <section
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#09f59b66] to-[#43ffefa2] text-gray-100 flex flex-col z-40 transform transition-transform md:relative md:w-20 lg:w-64 md:translate-x-0 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 p-4 border-b border-gray-900">
          <div className="flex gap-2 items-center">
             <span className="text-xl font-bold md:hidden lg:block" >FisiON</span>
          </div>
          <button className="md:hidden" onClick={() => setMenuAberto(false)}>
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1">
          {[
            { to: "/dashboard", icon: MdGridView, label: " Dashboard" },
            { to: "/agendas", icon: MdViewAgenda, label: " Agendas" },
            { to: "/fisioterapeutas", icon: MdPeople, label: " Fisioterapeutas" },
          ].map(({ to, icon: Icon, label }) => (
            <div key={to} className="px-4 lg:px-6 mb-2">
              <Link
                to={to}
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === to
                    ? "bg-cyan-600 text-white shadow-md"
                    : "hover:bg-slate-700"
                }`}
              >
                <Icon className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">{label}</span>
              </Link>
            </div>
          ))}

          {/* Info do usuário e logout */}
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center p-2">
              <MdPeople className="w-8 h-8 p-2 bg-slate-700 text-cyan-400 rounded-full" />
              <div className="ml-3 md:hidden lg:block">
                <p className="text-sm font-bold text-white">
                  {dadosUsuario?.nome}
                </p>
                <p className="text-xs text-gray-400">{dadosUsuario?.email}</p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 p-3 w-full text-slate-300 justify-center"
              onClick={botaoLogout}
            >
              <MdLogout className="w-8 h-8 p-2 bg-slate-700 text-red-400 rounded-full" />
              <span className="text-red-400 md:hidden lg:block">Sair</span>
            </button>
          </div>
        </nav>
      </section>

      {/* Conteúdo principal */}
      <section className="flex-1 p-4 text-gray-800 bg-gray-100 overflow-auto">
        <header className="flex items-center mb-4">
          <button className="md:hidden" onClick={() => setMenuAberto(true)}>
            <MdMenu className="w-8 h-8" />
          </button>
          <div className="flex items-center justify-center flex-1 gap-2 md:hidden">
            <span className="font-bold">FisiOn</span>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ✅ Agendas e Cadastro de Agendas separados */}
            <Route path="/agendas" element={<Agendas />} />
            <Route path="/agendas/cadastrar" element={<CadAgendas />} />

            <Route path="/cadfisioterapeutas" element={<CadFisioterapeutas />} />
            <Route path="/fisioterapeutas" element={<Fisioterapeutas />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}
