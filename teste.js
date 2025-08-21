/**
 * Função para executar uma query genérica na API Firebird.
 * @param {string} sqlQuery - A string da sua consulta SQL.
 * @param {Array} [params=[]] - Um array com os parâmetros para a query (opcional).
 * @returns {Promise<Object>} - Uma promessa que resolve com o resultado da API.
 */
async function executarQuery(sqlQuery, params = []) {
    const apiUrl = 'http://localhost:3000/table/query';

    // Validação básica de entrada
    if (!sqlQuery || typeof sqlQuery !== 'string') {
        throw new Error('O parâmetro "sqlQuery" é obrigatório e deve ser uma string.');
    }

    console.log(`Executando query: ${sqlQuery}`, params.length > 0 ? `com parâmetros: ${JSON.stringify(params)}` : '');

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: sqlQuery,
                params: params,
            }),
        });

        // Converte a resposta para JSON
        const result = await response.json();

        // Verifica se a requisição HTTP foi bem-sucedida (status 2xx)
        if (!response.ok) {
            // Se não foi, lança um erro com a mensagem da API
            console.error('A API retornou um erro:', result);
            throw new Error(result.error || `Erro HTTP: ${response.status}`);
        }

        // Retorna o resultado em caso de sucesso
        return result;

    } catch (error) {
        // Captura erros de rede ou falhas na conversão do JSON
        console.error('Falha ao se comunicar com a API:', error.message);
        // Lança o erro novamente para que o código que chamou a função possa tratá-lo
        throw error;
    }
}

// --- EXEMPLOS DE COMO USAR A FUNÇÃO ---

// Exemplo 1: Query simples sem parâmetros
async function buscarTodosClientes() {
    try {
        const clientes = await executarQuery('SELECT * FROM CLIENTES');
        console.log('Resultado (Todos os Clientes):', clientes);
    } catch (error) {
        console.error('Não foi possível buscar os clientes.');
    }
}

// Exemplo 2: Query com parâmetros para buscar um cliente específico
async function buscarClientePorCodigo(codigo) {
    try {
        const cliente = await executarQuery('SELECT NOME FROM CLIENTES WHERE CODIGO = ?', [codigo]);
        console.log(`Resultado (Cliente código ${codigo}):`, cliente);
    } catch (error) {
        console.error(`Não foi possível buscar o cliente de código ${codigo}.`);
    }
}


// --- Para testar, descomente e execute as chamadas abaixo ---
buscarTodosClientes();
buscarClientePorCodigo(10);
buscarClientePorCodigo(15);
