const mongoose = require('mongoose');

// Definindo o schema de ExpenseModel
const eventoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,  // Remove espaços em branco nas extremidades
  },
  
  description: {
    type: String,
    required: true,
    trim: true,  // Remove espaços em branco nas extremidades
  },

  date: {
    type: Date,
    required: true,
  },
  
  local: {
    type: String,
    required: true,
    trim: true,  // Remove espaços em branco nas extremidades
  },
  
});

// Criando o modelo baseado no schema
const EventoModel = mongoose.model('Evento', eventoSchema);

export default EventoModel
