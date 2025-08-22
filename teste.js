/**
 * Envia os dados de um novo produto para o endpoint de cadastro na API.
 * @param {object} produtoObjeto - Um objeto JSON contendo todos os dados do produto a ser cadastrado.
 * @returns {Promise<object>} Uma promessa que resolve com a resposta da API.
 */
async function cadastro(produtoObjeto) {
  const apiUrl = "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Converte o objeto JavaScript em uma string JSON para envio
      body: JSON.stringify(produtoObjeto),
    });

    // Converte a resposta da API (que também é uma string JSON) de volta para um objeto
    const resultado = await response.json();

    // Verifica se a requisição foi bem-sucedida (status 2xx)
    if (!response.ok) {
      // Se a API retornou um erro (ex: 409 Produto já existe), ele será exibido aqui
      console.error(`Erro da API: ${resultado.error}`);
      throw new Error(resultado.error);
    }

    console.log("Sucesso:", resultado.message);
    return resultado;
  } catch (error) {
    // Captura erros de rede ou falhas na comunicação com a API
    console.error("Falha ao se comunicar com a API:", error.message);
    throw error;
  }
}

async function estoque(bodoy) {
  const apiUrl = "http://localhost:3000/update/produto";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Converte o objeto JavaScript em uma string JSON para envio
      body: JSON.stringify(bodoy),
    });
    console.log(response);
  } catch (error) {
    // Captura erros de rede ou falhas na comunicação com a API
    console.error("Falha ao se comunicar com a API:", error.message);
    throw error;
  }
}

const novoProduto = {
  BARCODE: '7898146823422',
  QUANTITY: 244,
  PASSWORD: '238702',
  USERCODE: '0',
};
estoque(novoProduto)
  .then((resposta) => console.log("Operação finalizada com sucesso."))
  .catch((erro) => console.log("Operação falhou."));
