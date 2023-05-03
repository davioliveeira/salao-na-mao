const axios = require('axios');

const data = {
  salaoId: '64501bfe4933d93a2cc9b66e',
  servico: {
    titulo: 'Corte de cabelo Degrade',
    descricao: 'Corte de cabelo masculino com tesoura',
    preco: 25,
    comissao: 100,
    duracao: 30,
    recorrencia: 15,
    status :  'A' 
  }
};

axios.post('http://localhost:8000/servico', data)
  .then(response => console.log(response.data))
  .catch(error => console.log(error.message));
