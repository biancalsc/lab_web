const mongoose = require('mongoose');

// Definindo o schema do modelo de Despesa
const schemaDespesa = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
    trim: true,  // Remove espaços em branco nas extremidades
  },
  valor: {
    type: Number,
    required: true,
    min: 0,  // Garante que o valor seja positivo
  },
  data: {
    type: Date,
    required: true,
  }
});

// Criando o modelo baseado no schema
const ModeloDespesa = mongoose.model('Despesa', schemaDespesa);

export default ModeloDespesa;
