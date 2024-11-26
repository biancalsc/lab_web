import EventoModel from '../models/EventoModel'; // Importando o modelo
import { Request, Response } from "express";

class EventoController {
  // Método para criar um evento
  static async create(req: Request, res: Response) {
    const { title, description, date, local } = req.body;

    try {
      // Validação simples dos campos
      if (!description || !title || !local || !date || isNaN(new Date(date).getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Descrição, título, local e data válidos são obrigatórios.',
        });
      }

      // Criação do novo evento
      const evento = new EventoModel({
        description,
        title,
        local,
        date,
      });

      // Salvando o evento no banco de dados
      await evento.save();

      // Retornando sucesso
      return res.status(201).json({
        success: true,
        message: 'Evento criado com sucesso!',
        data: evento,
      });
    } catch (error) {
      // Tratamento de erro
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar evento.',
        error: errorMessage,
      });
    }
  }

  // Método para listar todos os eventos
  static async list(req: Request, res: Response) {
    try {
      // Buscando todos os eventos no banco
      const eventos = await EventoModel.find({}, '_id description title local date'); // Seleciona apenas os campos necessários

      // Retornando a lista de eventos
      return res.status(200).json({
        success: true,
        message: 'Eventos encontrados com sucesso!',
        data: eventos,
      });
    } catch (error: any) {
      // Tratamento de erro
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar eventos.',
        error: errorMessage,
      });
    }
  }

  // Método para atualizar um evento
  static async update(req: Request, res: Response) {
    const { _id } = req.params;  // Capturando o _id do evento via parâmetro de URL
    const { description, title, local, date } = req.body;  // Capturando os dados atualizados

    try {
      // Validação simples dos campos
      if (!description || !title || !local || !date || isNaN(new Date(date).getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Descrição, título, local e data válidos são obrigatórios.',
        });
      }

      // Procurando o evento pelo _id
      const evento = await EventoModel.findById(_id);

      if (!evento) {
        return res.status(404).json({
          success: false,
          message: 'Evento não encontrado.',
        });
      }

      // Atualizando os campos do evento
      evento.description = description;
      evento.local = local;
      evento.title = title;
      evento.date = date;

      // Salvando o evento atualizado no banco de dados
      await evento.save();

      // Retornando sucesso
      return res.status(200).json({
        success: true,
        message: 'Evento atualizado com sucesso!',
        data: evento,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar evento.',
        error: errorMessage,
      });
    }
  }

  // Método para deletar um evento
  static async delete(req: Request, res: Response) {
    try {
      // Procurando e deletando o evento pelo _id
      const evento = await EventoModel.findByIdAndDelete(req.params._id);
  
      if (!evento) {
        return res.status(404).json({
          success: false,
          message: 'Evento não encontrado.',
        });
      }
  
      // Retornando sucesso
      return res.status(200).json({
        success: true,
        message: 'Evento deletado com sucesso!',
        data: evento,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar evento.',
        error: errorMessage,
      });
    }
  }
}

export default EventoController;
