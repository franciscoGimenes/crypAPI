const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());

// Função para criptografar uma mensagem
function encryptMessage(message) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); // Gera uma chave aleatória de 32 bytes
    const iv = crypto.randomBytes(16);  // Gera um IV (vetor de inicialização) de 16 bytes

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted,
        key: key.toString('hex')
    };
}

// Função para descriptografar uma mensagem
function decryptMessage(encryptedData, key, iv) {
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

// Middleware de autenticação por chave de API
function authenticateAPIKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Acesso negado: chave de API inválida' });
    }
    next();
}

// Rota para criptografar a mensagem (requer chave de API)
app.post('/encrypt', authenticateAPIKey, (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const encrypted = encryptMessage(message);
    res.json(encrypted);
});

// Rota para descriptografar a mensagem (requer chave de API)
app.post('/decrypt', authenticateAPIKey, (req, res) => {
    const { encryptedData, key, iv } = req.body;
    if (!encryptedData || !key || !iv) {
        return res.status(400).json({ error: 'Encrypted data, key, and IV are required' });
    }

    try {
        const decryptedMessage = decryptMessage(encryptedData, key, iv);
        res.json({ decryptedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Decryption failed' });
    }
});

// Servidor ouvindo na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
