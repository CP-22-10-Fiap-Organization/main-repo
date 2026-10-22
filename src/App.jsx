
import React from "react";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/produtos" element={<Produtos />} />

        <Route path="*" element={<EmBreve />} />
      </Routes>
    </BrowserRouter>
  );
}
