import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";

// Página provisória para rotas que ainda não foram criadas (/produtos, /login, etc.)
function EmBreve() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 px-4 text-center">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Esta página ainda não existe
      </h1>
      <p className="text-slate-600">Volte para o início para continuar.</p>
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
        {/* Adicione aqui as próximas páginas, por exemplo:
        <Route path="/produtos" element={<Produtos />} /> */}
        <Route path="*" element={<EmBreve />} />
      </Routes>
    </BrowserRouter>
  );
}