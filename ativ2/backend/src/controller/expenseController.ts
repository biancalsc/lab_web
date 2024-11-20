import ExpenseModel from '../models/ExpenseModel'; // Importando o modelo de Despesa
import { Request, Response } from "express";

class DespesaController {
  // Método para criar uma nova despesa
  static async criar(req: Request, res: Response) {
    const { descricao, valor, data } = req.body; // Desestruturando os dados da despesa recebidos no corpo da requisição

    try {
      // Validação simples dos campos obrigatórios
      if (!descricao || !valor || !data) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Descrição, valor e data são obrigatórios.',
        });
      }

      // Criando uma nova instância do modelo de despesa com os dados fornecidos
      const novaDespesa = new ExpenseModel({
        description: descricao,
        amount: valor,
        date: data,
      });

      // Salvando a nova despesa no banco de dados
      await novaDespesa.save();

      // Respondendo com sucesso
      return res.status(201).json({
        sucesso: true,
        mensagem: 'Despesa criada com sucesso!',
        dados: novaDespesa,
      });
    } catch (erro:any) {
      // Tratamento de erro ao tentar criar a despesa
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao criar despesa.',
        erro: erro.message,
      });
    }
  }

  // Método para listar todas as despesas
  static async listar(req: Request, res: Response) {
    try {
      // Buscando todas as despesas no banco de dados, selecionando apenas os campos necessários
      const todasDespesas = await ExpenseModel.find({}, '_id description amount date');

      // Respondendo com a lista de despesas
      return res.status(200).json({
        mensagem: 'Despesas encontradas com sucesso!',
        dados: todasDespesas,
      });
    } catch (erro: any) {
      // Tratamento de erro ao tentar listar as despesas
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao listar despesas.',
        erro: erro.message,
      });
    }
  }

  // Método para atualizar uma despesa existente
  static async atualizar(req: Request, res: Response) {
    const { _id } = req.params; // Capturando o ID da despesa pela URL
    const { descricao, valor, data } = req.body; // Capturando os novos dados para atualização

    try {
      // Validação simples dos campos obrigatórios
      if (!descricao || !valor || !data) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'Descrição, valor e data são obrigatórios.',
        });
      }

      // Procurando a despesa no banco pelo ID fornecido
      const despesaAtualizar = await ExpenseModel.findById(_id);

      if (!despesaAtualizar) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Despesa não encontrada.',
        });
      }

      // Atualizando os dados da despesa com os novos valores fornecidos
      despesaAtualizar.description = descricao;
      despesaAtualizar.amount = valor;
      despesaAtualizar.date = data;

      // Salvando as alterações no banco de dados
      await despesaAtualizar.save();

      // Respondendo com sucesso
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Despesa atualizada com sucesso!',
        dados: despesaAtualizar,
      });
    } catch (erro: any) {
      // Tratamento de erro ao tentar atualizar a despesa
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao atualizar despesa.',
        erro: erro.message,
      });
    }
  }

  // Método para deletar uma despesa existente
  static async deletar(req: Request, res: Response) {
    try {
      // Procurando a despesa a ser deletada pelo ID fornecido
      const despesaDeletada = await ExpenseModel.findByIdAndDelete(req.params._id);

      if (!despesaDeletada) {
        return res.status(404).json({
          sucesso: false,
          mensagem: 'Despesa não encontrada.',
        });
      }

      // Respondendo com sucesso após a exclusão
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Despesa deletada com sucesso!',
        dados: despesaDeletada,
      });
    } catch (erro: any) {
      // Tratamento de erro ao tentar deletar a despesa
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao deletar despesa.',
        erro: erro.message,
      });
    }
  }
}

export default DespesaController;
