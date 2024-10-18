
# API de Criptografia

Esta API permite criptografar e descriptografar mensagens usando chaves simétricas. Ela é útil para proteger informações sensíveis durante a transmissão. A seguir estão as instruções sobre como usar a API, incluindo opções de chaves e exemplos de chamadas de função.

## Funcionalidades

- **Criptografia de Mensagens**: Permite criptografar uma mensagem com uma chave escolhida.
- **Descriptografia de Mensagens**: Permite descriptografar uma mensagem criptografada usando a mesma chave.

## Opções de Chave

A API oferece 10 chaves predefinidas, identificadas por números de `1` a `10`. Cada chave é gerada aleatoriamente e pode ser usada para criptografar e descriptografar mensagens.

## Estrutura do Projeto

- **index.js**: Arquivo principal do servidor, onde a API está implementada.
- **index.html**: Interface do usuário para interagir com a API.

## Usando a API

### Criptografar Mensagem

Para criptografar uma mensagem, faça uma requisição `POST` para a rota `/encrypt` com o seguinte corpo JSON:

```json
{
    "message": "Sua mensagem aqui",
    "keyName": "1" // Escolha uma chave entre "1" e "10"
}
```

### Descriptografar Mensagem

Para descriptografar uma mensagem, faça uma requisição `POST` para a rota `/decrypt` com o seguinte corpo JSON:

```json
{
    "encryptedData": "Dados criptografados aqui",
    "keyName": "1" // Escolha uma chave entre "1" e "10"
}
```

### Exemplo de chamada usando Fetch

Aqui está um exemplo de como usar a função `fetch` para chamar a API a partir do arquivo `index.html`:

```javascript
fetch(`${apiUrl}/encrypt`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY, // Adicione sua chave de API aqui
    },
    body: JSON.stringify({ message: 'Sua mensagem', keyName: '1' }),
})
.then(response => response.json())
.then(data => {
    console.log('Mensagem criptografada:', data.encryptedData);
})
.catch(error => console.error('Erro ao criptografar:', error));
```


```javascript
fetch(`${apiUrl}/decrypt`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY, // Adiciona a chave de API no cabeçalho
    },
    body: JSON.stringify({ encryptedData, keyName }),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao descriptografar'); // Lança um erro se a resposta não for OK
    }
    return response.json();
})
.then(data => {
    document.getElementById('decryptedMessage').textContent = data.decryptedMessage;
})
.catch(error => {
    console.error('Erro ao descriptografar:', error);
    alert('Falha na descriptografia: verifique a mensagem e a chave.'); // Exibe o alerta
});
```

### Importando do Replit

use a URL `https://7aa64dd7-8b85-4e40-8227-f6109fa9a47d-00-3he3e491624h2.riker.replit.dev` para o declarar a `APIurl`

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um problema ou enviar um pull request.


## Contato

Para mais informações, entre em contato com [f.gimenes1316@gmail.com][06.phas@gmail.com].

