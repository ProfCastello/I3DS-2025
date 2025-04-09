import React, { useEffect, useRef, useState } from "react";

const Chat = (props) => {
  const [messageList, setMessageList] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [countdown, setCountdown] = useState(5); // Estado para a contagem regressiva
  const messageRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => props.socket.off("receive_message");
  }, [props.socket]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const handleSubmit = () => {
    const message = messageRef.current.value;

    // Verifica se o autor é "undefined" ou se a mensagem está vazia
    if (!props.socket.id || props.socket.id === "undefined") {
      setShowModal(true); // Exibe o modal
      let timer = 5; // Tempo inicial da contagem regressiva
      setCountdown(timer);

      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);

        if (timer <= 0) {
          clearInterval(interval);
          window.location.reload(); // Recarrega a página após a contagem regressiva
        }
      }, 1000);

      return;
    }

    if (!message.trim()) return;

    props.socket.emit("message", message);

    messageRef.current.value = "";
    messageRef.current.focus();
  };

  return (
    <div>
      {/* Modal do Bootstrap */}
      {showModal && (
        <div
          className="modal show d-flex justify-content-center align-items-center"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Serviço Indisponível</h5>
              </div>
              <div className="modal-body">
                <p>
                  O serviço está fora. A página será recarregada em{" "}
                  <strong>{countdown}</strong> segundos.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => window.location.reload()}
                >
                  Recarregar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      <div
        id="chat-container"
        style={{ width: "400px", height: "600px" }}
        className="m-4 bg-secondary rounded-4 p-3 d-flex flex-column"
      >
        <div
          id="chat-body"
          className="d-flex flex-column gap-3 overflow-y-hidden h-100"
        >
          {messageList.map((message, index) => (
            <div
              className={`${
                message.authorId === props.socket.id
                  ? "align-self-end ms-5 bg-dark"
                  : "align-self-start me-5 bg-dark-subtle text-dark "
              } rounded-3 p-2`}
              key={index}
            >
              <div id="message-author" className="fw-bold">
                {message.author}
              </div>
              <div id="message-text">{message.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div id="chat-footer" className="input-group ">
          <input
            ref={messageRef}
            autoFocus
            type="text"
            className="form-control bg-dark-subtle border-0"
            placeholder="Mensagem"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            className="btn btn-dark m-0 input-group-text"
            id="basic-addon1"
            onClick={() => handleSubmit()}
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
