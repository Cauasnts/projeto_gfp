import React, { useState } from 'react';

const Exercicio_Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setmensagem] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    setmensagem(true);
  

    if (email === '' && senha === '') {
      alert('Login realizado com sucesso!');
      // redirecionar ou salvar token, etc.
    } else {
      alert('Usuário ou senha inválidos');
    }

    setLoading(false);
  };

  const Limpar = () => {
    setEmail('');
    setSenha('');
    setmensagem(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <button
              type="button"
              onClick={Limpar}
              className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Exercicio_Login;
