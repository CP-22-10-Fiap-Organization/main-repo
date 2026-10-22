import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Produtos from "./pages/Produtos";
import Home from "./pages/Home";

// Página provisória para rotas que ainda não foram criadas
function EmBreve() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 px-4 text-center">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Esta página ainda não existe
      </h1>

      <p className="text-slate-600">
        Volte para o início para continuar.
      </p>

      <Link
        to="/"
        className="inline-flex h-11 items-center rounded-full bg-blue-700 px-6 font-semibold text-white hover:bg-blue-800"
      >
        Voltar para a home
      </Link>
    </main>
  );
}

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((atual) => {
      const existente = atual.find((item) => item.id === produto.id);
      if (existente) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...atual, { ...produto, quantidade: 1 }];
    });
  };

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <BrowserRouter>
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
        <Link to="/" className="font-bold text-blue-700">
          Minha Loja
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/produtos" className="text-slate-700 hover:text-blue-700">
            Produtos
          </Link>
          <Link to="/carrinho" className="font-semibold text-blue-700">
            🛒 Carrinho ({totalItens})
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/produtos"
          element={<Produtos onAdicionar={adicionarAoCarrinho} />}
        />

        <Route path="*" element={<EmBreve />} />
      </Routes>
    </BrowserRouter>
  );
}