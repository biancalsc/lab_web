import { Request, Response } from 'express';
import Cliente from '../models/ClienteModel'; // Supondo que o modelo esteja nesta pasta

class ClienteController {
  // Criar um novo cliente
  async create(req: Request, res: Response): Promise<Response> { 
    try {console.log("passou")
        const { nome, email, status } = req.body;

        const cliente = new Cliente({ nome, email, status });
        const novoCliente = await cliente.save();

        return res.status(201).json(novoCliente);
    } catch (error) {console.log("passou")
        console.error('Erro ao criar cliente:', error);
        return res.status(500).json({ message: 'Erro ao criar cliente', error });
    }
}


  // Listar todos os clientes
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await Cliente.find();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar clientes', error });
    }
  }

  // Atualizar um cliente existente
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const clienteAtualizado = await Cliente.findByIdAndUpdate(id, {
        nome,
        email
      }, { new: true });

      if (!clienteAtualizado) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      return res.status(200).json(clienteAtualizado);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
  }

  // Deletar um cliente
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
  
      const clienteRemovido = await Cliente.findByIdAndDelete(id);
  
      if (!clienteRemovido) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
  
      return res.status(200).json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao remover cliente', error });
    }
  }
  
}

export default new ClienteController();
