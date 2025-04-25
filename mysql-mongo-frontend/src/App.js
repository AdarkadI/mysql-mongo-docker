import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    telefone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const enviarParaApi = (url) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  const handleSubmitMongo = (e) => {
    e.preventDefault();
    enviarParaApi("http://localhost:8081/api-mongo/pessoa")
      .then((res) => res.json())
      .then(() => alert("Enviado para MongoDB"))
      .catch((err) => console.error("Erro Mongo:", err));
  };

  const handleSubmitMySQL = (e) => {
    e.preventDefault();
    enviarParaApi("http://localhost:8082/api-mysql/pessoa")
      .then((res) => res.json())
      .then(() => alert("Enviado para MySQL"))
      .catch((err) => console.error("Erro MySQL:", err));
  };

  const handleSubmitAmbos = (e) => {
    e.preventDefault();
    Promise.all([
      enviarParaApi("http://localhost:8081/api-mongo/pessoa"),
      enviarParaApi("http://localhost:8082/api-mysql/pessoa"),
    ])
      .then(() => alert("Enviado para MongoDB e MySQL"))
      .catch((err) => console.error("Erro ao enviar para ambos:", err));
  };

  return (
    <div>
      <h1>Formulário de Pessoa</h1>
      <form>
        <div>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefone</label>
          <input
            type="text"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmitMongo}>Enviar para MongoDB</button>
        <button onClick={handleSubmitMySQL}>Enviar para MySQL</button>
        <button onClick={handleSubmitAmbos}>Enviar para os dois</button>
      </form>
    </div>
  );
}

export default App;
