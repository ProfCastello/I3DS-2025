/**
 * Formata um valor numérico para moeda brasileira (R$)
 * @param {number} valor - O valor a ser formatado
 * @returns {string} - O valor formatado no padrão monetário brasileiro
 */
export const formatarMoeda = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
