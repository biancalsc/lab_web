import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Título da página
export const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

// Container para a adição de dados
export const AddDataContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Container para mostrar os dados
export const ShowDataContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Formulário de cadastro/edição
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Input genérico para os campos do formulário
export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Botões alinhados lado a lado
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

// Botão genérico
export const Button = styled.button<{ red?: boolean }>`
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: ${(props) => (props.red ? '#d32f2f' : '#0288d1')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.red ? '#b71c1c' : '#0277bd')};
  }
`;

// Lista de eventos
export const ExpenseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Item da lista de eventos
export const ExpenseItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;

  /* Espaçamento e layout flexível */
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }

  div {
    margin-top: 10px;
  }

  ${ButtonGroup} {
    margin-top: 10px;
  }
`;
