// frontend/src/pages/Despesa.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Titulo,
  Formulario,
  Entrada,
  Botao,
  ListaDespesas,
  ItemDespesa,
  TotalDespesas,
} from './styles';
import moment from 'moment';

interface Despesa {
  _id: string;
  descricao: string;
  valor: number;
  data: string;
}

const Despesa: React.FC = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [total, setTotal] = useState(0);
  const [despesaEditando, setDespesaEditando] = useState<Despesa | null>(null);  // Novo estado para a despesa sendo editada

  useEffect(() => {
    listarDespesas();
  }, []);

  const adicionarDespesa = async () => {
    if (descricao && valor && data) {
      try {
        const resposta = await axios.post('http://10.68.55.162:3000/despesa', {
          descricao,
          valor: parseFloat(valor),
          data,
        });

        if (resposta.data.sucesso) {
          const novaDespesa = resposta.data.dados;
          setDespesas([...despesas, novaDespesa]);
          setTotal(total + novaDespesa.valor);
          setDescricao('');
          setValor('');
          setData('');
        }
      } catch (erro) {
        console.error('Erro ao adicionar despesa:', erro);
      }
    }
  };

  const excluirDespesa = async (_id: string) => {
    try {
      const resposta = await axios.delete(`http://10.68.55.162:3000/despesa/delete/${_id}`);

      if (resposta.data.sucesso) {
        const despesasFiltradas = despesas.filter((despesa) => despesa._id !== _id);
        const valorDespesa = despesas.find((despesa) => despesa._id === _id)?.valor || 0;
        setDespesas(despesasFiltradas);
        setTotal(total - valorDespesa);
      }
    } catch (erro) {
      console.error('Erro ao excluir despesa:', erro);
    }
  };

  const atualizarDespesa = async () => {
    if (despesaEditando && descricao && valor && data) {
      try {
        const despesaAtualizada = {
          ...despesaEditando,
          descricao,
          valor: parseFloat(valor),
          data,
        };

        const resposta = await axios.put(`http://10.68.55.162:3000/despesa/update/${despesaEditando._id}`, despesaAtualizada);

        if (resposta.data.sucesso) {
          const despesasAtualizadas = despesas.map((despesa) =>
            despesa._id === despesaEditando._id ? resposta.data.dados : despesa
          );
          setDespesas(despesasAtualizadas);
          calcularTotal(despesasAtualizadas);
          setDespesaEditando(null);  // Limpar estado de edição após atualização
          setDescricao('');
          setValor('');
          setData('');
        }
      } catch (erro) {
        console.error('Erro ao atualizar despesa:', erro);
      }
    }
  };

  const listarDespesas = async () => {
    try {
      const resposta = await axios.get('http://10.68.55.162:3000/despesa/list');
      const listaDespesas = resposta.data.dados;
      setDespesas(listaDespesas);
      calcularTotal(listaDespesas);
    } catch (erro) {
      console.error('Erro ao listar despesas:', erro);
    }
  };

  const calcularTotal = (despesas: Despesa[]) => {
    const totalValor = despesas.reduce((acumulador, despesa) => acumulador + despesa.valor, 0);
    setTotal(totalValor);
  };

  const editarDespesa = (despesa: Despesa) => {
    setDespesaEditando(despesa);
    setDescricao(despesa.descricao);
    setValor(despesa.valor.toString());
    setData(despesa.data);
  };

  return (
    <Container>
      <Titulo>Controle de Despesas</Titulo>
      <Formulario>
        <Entrada
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Entrada
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <Entrada
          type="date"
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        {despesaEditando ? (
          <Botao onClick={atualizarDespesa}>Atualizar </Botao>  // Botão para atualizar
        ) : (
          <Botao onClick={adicionarDespesa}>Adicionar Despesa</Botao>  // Botão para adicionar
        )}
      </Formulario>
      <TotalDespesas>Total das Despesas: R${total.toFixed(2)}</TotalDespesas>
      <ListaDespesas>
        {despesas.map((despesa) => (
          <ItemDespesa key={despesa._id}>
            {despesa.descricao} - R${despesa.valor.toFixed(2)} - {moment(despesa.data).format("DD-MM-YYYY")}
            <Botao onClick={() => excluirDespesa(despesa._id)} red>
              Excluir
            </Botao>
            <Botao onClick={() => editarDespesa(despesa)} >
              Atualizar
            </Botao>
          </ItemDespesa>
        ))}
      </ListaDespesas>
    </Container>
  );
};

export default Despesa;
