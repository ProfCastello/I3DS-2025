import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../main.jsx";

const Checkout = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { formatarMoeda } = useContext(GlobalContext);

  const total = carrinho.reduce(
    (acc, item) =>
      acc + (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
    0
  );

  useEffect(() => {
    const itensCarrinho = localStorage.getItem("devcarrinho");
    itensCarrinho ? setCarrinho(JSON.parse(itensCarrinho)) : navigate("/");
  }, [navigate]);

  const handleConfirmar = () => {
    alert("Compra confirmada! Obrigado 😊");
    localStorage.removeItem("devcarrinho");
    navigate("/");
  };

  const handleUpdateQuantidade = (item, novaQuantidade) => {
    const novoCarrinho = carrinho.map((produto) =>
      produto.id === item.id
        ? { ...produto, quantidade: novaQuantidade > 0 ? novaQuantidade : 1 }
        : produto
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem("devcarrinho", JSON.stringify(novoCarrinho));
  };

  const handleRemoverItem = (item) => {
    const novoCarrinho = carrinho.filter((produto) => produto.id !== item.id);
    setCarrinho(novoCarrinho);
    localStorage.setItem("devcarrinho", JSON.stringify(novoCarrinho));

    if (novoCarrinho.length === 0) {
      navigate("/");
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-sm rounded-4 mb-4"
            style={{ background: "#d9d9d9" }}
          >
            <div className="card-header border-bottom-0 py-3">
              <h4 className="mb-0 fw-bolder">Meu Carrinho</h4>
            </div>
            <div className="card-body p-4">
              {carrinho.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x fs-1 text-muted"></i>
                  <p className="mt-3 mb-0">Seu carrinho está vazio.</p>
                  <button
                    id="addCarrinho"
                    className="btn btn-success desconto border-0 px-3 py-2 text-light mt-3"
                    onClick={() => navigate("/")}
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <>
                  {carrinho.map((item, index) => (
                    <div key={item.id} className="row mb-4 position-relative">
                      <div className="col-md-2 col-4">
                        <img
                          src={item.imagem}
                          alt={item.titulo}
                          className="img-fluid rounded-3 object-fit-cover"
                          style={{ height: "100px", width: "100%" }}
                        />
                      </div>
                      <div className="col-md-6 col-8">
                        <h5 className="fw-bold mb-1">{item.titulo}</h5>
                        <small className="text-muted">ID: #{item.id}</small>
                        <div className="d-flex align-items-center mt-3">
                          <button
                            onClick={() => handleRemoverItem(item)}
                            className="btn btn-sm btn-outline-danger border-0"
                          >
                            <i className="bi bi-trash me-1"></i> Remover
                          </button>
                        </div>
                      </div>
                      <div className="col-md-4 col-12 mt-3 mt-md-0">
                        <div className="row align-items-center">
                          <div className="col-6">
                            <div className="border border-dark-subtle border-1 d-flex align-items-center rounded-4 gap-2">
                              <button
                                className="btn border-0"
                                type="button"
                                disabled={item.quantidade === 1}
                                onClick={() =>
                                  handleUpdateQuantidade(
                                    item,
                                    item.quantidade - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{item.quantidade}</span>

                              <button
                                className="btn border-0"
                                type="button"
                                onClick={() =>
                                  handleUpdateQuantidade(
                                    item,
                                    item.quantidade + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-6 text-end">
                            <div className="d-flex flex-column">
                              <small className="text-decoration-line-through text-muted">
                                {formatarMoeda(item.preco)}
                              </small>
                              <span className="fw-bold text-danger fs-5">
                                {formatarMoeda(
                                  item.preco -
                                    (item.preco * item.desconto) / 100
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < carrinho.length - 1 && <hr className="my-3" />}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4"
            style={{ background: "#d9d9d9" }}
          >
            <div className="card-header border-bottom-0 py-3">
              <h4 className="mb-0 fw-bolder">Resumo do Pedido</h4>
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-2">
                <span>
                  Subtotal ({carrinho.length}{" "}
                  {carrinho.length === 1 ? "item" : "itens"})
                </span>
                <span>{formatarMoeda(total)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Frete</span>
                <span className="text-success">Grátis</span>
              </div>

              <hr className="my-3" />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-4">{formatarMoeda(total)}</span>
              </div>

              <button
                id="addCarrinho"
                className="btn btn-success desconto border-0 text-light w-100 py-3 fw-bold"
                onClick={handleConfirmar}
                disabled={carrinho.length === 0}
              >
                Finalizar Compra
              </button>

              <button
                style={{
                  background: isHovered && "#2a475e",
                  borderColor: "#2a475e",
                  color: !isHovered && "#2a475e",
                }}
                className="btn btn-outline-secondary w-100 mt-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate("/")}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
