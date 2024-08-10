const express = require('express');
const axios = require('axios');
const cepRegex = /^[0-9]{5}-?[09]{3}$/;

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/route', (req, res) => {
    res.send('Minha primeira rota');
})



app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep; //Obtendo o CEP da URL
    const cepRegex = /^[0-9]{5}-?[09]{3}$/;
    cepRegex.test(cep);
    
    try{
        // Fazendo a requisição para a API do ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
        res.json(response.data); //Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        res.status(500).send('Erro ao consultar o CEP');
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/consulta-cep/86036590`);
})

