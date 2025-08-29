import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 mt-4">
        <h1 className="text-2xl font-bold mb-8">Meu Dashboard</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 rounded p-2">Início</a>
          <a href="#" className="hover:bg-gray-700 rounded p-2">Usuários</a>
          <a href="#" className="hover:bg-gray-700 rounded p-2">Relatórios</a>
          <a href="#" className="hover:bg-gray-700 rounded p-2">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Dashboard</h2>
        
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">Pacientes</p>
            <p className="text-2xl font-bold">1.250</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">Fisioterapeutas</p>
            <p className="text-2xl font-bold">3.450</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">Agendados</p>
            <p className="text-2xl font-bold">4.800</p>
          </div>
        </div>

        {/* Gráfico placeholder */}
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 mb-4">Gráfico de vendas</p>
          <div className="h-64 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-400">[Gráfico aqui]</span>
          </div>
        </div>
      </main>
    </div>
  );
}
