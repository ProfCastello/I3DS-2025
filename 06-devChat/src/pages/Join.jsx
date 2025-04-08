import React, { useRef } from "react";

const Join = (props) => {
  //Hooks
  const usernameRef = useRef();

  const handleSubmit = () => {
    const username = usernameRef.current.value;
    !username.trim() && alert("Por favor, digite um nome de usuário válido.");
    props.visibility(true);
  };

  return (
    <div className="text-center">
      <h1>devChat</h1>

      <div
        id="join-box"
        className="mt-4 bg-secondary rounded-4 py-4 px-5  d-flex flex-column justify-content-center align-items-center gap-3"
      >
        <h3>Bem-vindo ao devChat!</h3>
        <div className="form-floating mb-3">
          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Nome de usuário"
          />
          <label htmlFor="floatingInput" className="">
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
