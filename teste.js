/**
 * Envia os dados de um novo produto para o endpoint de cadastro na API.
 * @param {object} produtoObjeto - Um objeto JSON contendo todos os dados do produto a ser cadastrado.
 * @returns {Promise<object>} Uma promessa que resolve com a resposta da API.
 */
async function cadastrarNovoProduto(produtoObjeto) {
  const apiUrl = "http://localhost:3000/produto/cadastro";

  // Validação para garantir que o objeto não é nulo e possui um código
  if (!produtoObjeto || !produtoObjeto.CODIGO) {
    const erroMsg = 'O objeto do produto é inválido ou não contém um "CODIGO".';
    console.error(erroMsg);
    throw new Error(erroMsg);
  }

  console.log(`Tentando cadastrar o produto: ${produtoObjeto.CODIGO}...`);

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

// --- EXEMPLO DE COMO USAR A FUNÇÃO ---

// 1. Crie um objeto com os dados do produto que você quer cadastrar.
//    As chaves do objeto (CODIGO, PRODUTO, etc.) devem corresponder
//    exatamente aos nomes das colunas na sua tabela PRODUTOS.
const novoProduto = {
    "CODIGO": "789097621",
    "PRODUTO": "AGULHA 30X0.80 BD DESCARTEX",
    "PRECOCUSTO": 0.19,
    "LUCRO": 426.315795898438,
    "PRECOVENDA": 1,
    "PRECOFARMACIAPOPULAR": null,
    "PRECOCUSTOGLOBAL": null,
    "DESCONTO": null,
    "UNIDADE": "UN",
    "TRIBUTACAO": "Substituição Tributária",
    "ALIQUOTA": 0,
    "BASECALCULO": 0,
    "FORNECEDOR": null,
    "LABORATORIO": null,
    "SECAO": 4,
    "SUBSECAO": 50,
    "LISTA": null,
    "NCM": "90183219",
    "ESTOQUEATUAL": 84,
    "ESTOQUEMINIMO": null,
    "ESTOQUEIDEAL": null,
    "INICIOPROM": null,
    "FINALPROM": null,
    "DESCPROMVISTA": null,
    "DESCPROMPRAZO": null,
    "ATALHOBALANCA": null,
    "COMISSAO": null,
    "IMPRIMIR": "N   ",
    "FRACIONAMENTO": 1,
    "PRECOPROMPRAZO": null,
    "PRECOPROMVISTA": null,
    "PRINCIPIOATIVO": null,
    "REGMS": null,
    "CODIGOAUXILIAR": null,
    "APRESENTACAO": null,
    "FABRICACAOPROPRIA": "N   ",
    "MATERIAPRIMA": null,
    "QUANTIDADECONVERSAO": null,
    "FRETE": null,
    "SEGURO": null,
    "OUTROS": null,
    "CLASSEPRECO": null,
    "AUTENTIC": 3.6302104975738557e+18,
    "VENCIMENTOLOTE": null,
    "PRECOFABRICA": null,
    "FIXATRIBUTACAO": "N   ",
    "PRECOCALCULADOVISTA": null,
    "PRECOCALCULADOPRAZO": null,
    "DESCCALCULADOVISTA": null,
    "DESCCALCULADOPRAZO": null,
    "CLASSETERAPEUTICA": null,
    "UNIDADESNGPC": null,
    "LANCARNOSNGPC": "N   ",
    "ORIGEMPRODUTO": "0   ",
    "GRUPOFEBRAFAR": null,
    "CODIGOEPHARMA": null,
    "CODIGOFUNCIONAL": null,
    "DESCPROMVISTAFEBRAFAR": null,
    "DESCPROMPRAZOFEBRAFAR": null,
    "PRECOPROMVISTAFEBRAFAR": null,
    "PRECOPROMPRAZOFEBRAFAR": null,
    "FLASH_ESTOQUE": null,
    "IDREGISTRO": null,
    "TIPOPROMOCAO": "X   ",
    "PROMQTDMINIMAVISTA": null,
    "PROMQTDMINIMAPRAZO": null,
    "PROMPAGUEVISTA": null,
    "PROMLEVEVISTA": null,
    "PROMPAGUEPRAZO": null,
    "PROMLEVEPRAZO": null,
    "PROMKITQTDVISTA": null,
    "PROMKITQTDPRAZO": null,
    "PROMKITVALORVISTA": null,
    "PROMKITVALORPRAZO": null,
    "VALORCUSTOLIQUIDO": null,
    "VALORST": null,
    "VALORIPI": null,
    "VALORFRETE": null,
    "VALORSEGURO": null,
    "VALOROUTROS": null,
    "SATCODIGOBARRASINVALIDO": "N   ",
    "PROMSOMENTEFEBRAFAR": "N   ",
    "NAOFRACIONARABCFARMA": "N   ",
    "IMENDES_DATAATUALIZACAO": null,
    "IMENDES_TRIBUTACAOPDV": null,
    "IMENDES_ALIQUOTAPDV": null,
    "IMENDES_CFOPCOMPRA": null,
    "IMENDES_CFOPVENDA": null,
    "IMENDES_CST_CSOSN": null,
    "IMENDES_MODBC": null,
    "IMENDES_ALIQUOTAICMS": null,
    "IMENDES_ALIQUOTAREDUCAO": null,
    "IMENDES_ALIQUOTAREDUCAOST": null,
    "IMENDES_MODBCST": null,
    "IMENDES_ALIQUOTAST": null,
    "IMENDES_MVA": null,
    "IMENDES_VPAUTAST": null,
    "IMENDES_NCM": null,
    "IMENDES_ALIQUOTAIPI": null,
    "IMENDES_CSTIPI": null,
    "IMENDES_CSTPISCOFINSENTRADA": null,
    "IMENDES_CSTPISCOFINSSAIDA": null,
    "IMENDES_NATUREZARECEITA": null,
    "IMENDES_CEST": null,
    "PROMDESCRESIDUALVISTA": null,
    "PROMDESCRESIDUALPRAZO": null,
    "EXIBIRTELAUSOCONTINUO": "N   ",
    "ALIQUOTA_FCP": null,
    "CONTROLARLOTE": "N   ",
    "MEDICAMENTO": "N   ",
    "CEST": null,
    "DESCONTOMAXIMO": null,
    "DESCONTOMAXIMOPRAZO": null,
    "MVA": null,
    "ALIQUOTA_ST": null,
    "BC_ST": null,
    "VALOR_ST": null,
    "VALORICMSSUBSTITUTO": null,
    "CBENEF": null,
    "IMENDES_LISTA": null,
    "IMENDES_TIPO": null,
    "IMENDES_CSTIPIENTRADA": null,
    "IMENDES_CSTIPISAIDA": null,
    "IMENDES_ENQUADRAMENTOIPI": null,
    "IMENDES_EXCECAOIPI": null,
    "IMENDES_FCP": null,
    "IMENDES_CBNEF": null,
    "IMENDES_PERCENTUALDIFERIMENTO": null,
    "IMENDES_ANTECIPACAO": "N   ",
    "IMENDES_DESONERACAO": null,
    "PRECOWEB": null,
    "IMENDES_IDSEGMENTO": null,
    "REGMSFISCAL": null,
    "PERFILPRECOFARMACIAPOPULAR": null,
    "PRECOFARMACIAPOPULARBF": null,
    "MOLECULA": null,
    "OPERADORLOGISTICO": null,
    "ULTIMA_ALTERACAO_REGISTRO": null
  };

// 2. Chame a função passando o objeto.
//    É uma boa prática usar .then() e .catch() para lidar com o resultado.
cadastrarNovoProduto(novoProduto)
  .then((resposta) => console.log("Operação finalizada com sucesso."))
  .catch((erro) => console.log("Operação falhou."));
