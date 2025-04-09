import React, { useRef } from "react";
import io from "socket.io-client";

const Join = (props) => {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;

    // Verifica se o nome de usuário é válido
    if (!username.trim() || username.length < 3) {
      alert("Por favor, digite um nome de usuário válido.");
      return;
    }

    try {
      // Criando a conexão com o servidor socket
      const servidorSocket = io("http://localhost:3001", {
        timeout: 5000, // Timeout para a conexão
      });

      // Aguarda o evento "connect" para garantir que a conexão foi estabelecida
      servidorSocket.on("connect", () => {
        // Envia o nome de usuário para o servidor
        servidorSocket.emit("set_username", username);

        // Abrindo a página de chat
        props.setSocket(servidorSocket);
        props.visibility(true);
      });

      // Trata o evento de erro de conexão
      servidorSocket.on("connect_error", () => {
        alert(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      });
    } catch (error) {
      // Trata erros de conexão
      alert(
        "Erro ao conectar ao servidor. Verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <div className="text-center">
      <h1>devChat</h1>

      <div
        id="join-box"
        className="mt-4 bg-secondary rounded-4 py-4 px-5 d-flex flex-column justify-content-center align-items-center gap-3"
      >
        <h3>Bem-vindo ao devChat!</h3>
        <div className="form-floating mb-3">
          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="nomeUsuario"
            placeholder="Nome de usuário"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <label htmlFor="nomeUsuario" className="">
            Nome de usuário
          </label>
        </div>
        <button
          className="btn btn-light px-5 py-2"
          onClick={() => handleSubmit()}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Join;
