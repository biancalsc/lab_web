import React, { useEffect, useState } from "react";

interface Cliente {
    _id: string;
    nome: string;
    email: string;
}

const ClienteForm: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [clienteId, setClienteId] = useState<string | null>(null);

    const handleCadastrar = async () => {
        if (nome && email) {
            const novoCliente = { nome, email };
            try {
                const response = await fetch('http://localhost:3010/user/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(novoCliente),
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message || 'Erro ao cadastrar cliente');
                }

                const clienteCadastrado = await response.json();
                setClientes([...clientes, clienteCadastrado]);
                setNome("");
                setEmail("");
            } catch (error) {
                console.error('Erro ao cadastrar cliente:', error);
            }
        }
    };

    // Listar clientes quando o componente for montado
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:3010/user/');
                const clientesList = await response.json();
                setClientes(clientesList);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleDelete = async (id: string, index: number) => {
        try {
            const response = await fetch(`http://localhost:3010/user/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar cliente');
            }

            // Remove o cliente da lista localmente, após a confirmação do banco de dados
            const novosClientes = clientes.filter((_, i) => i !== index);
            setClientes(novosClientes);
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    const handleUpdate = async () => {
        if (clienteId && nome && email) {
            const clienteAtualizado = { nome, email };

            try {
                const response = await fetch(`http://localhost:3010/user/${clienteId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clienteAtualizado),
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message || 'Erro ao atualizar cliente');
                }

                const clienteAtualizadoResponse = await response.json();

                // Atualizar a lista de clientes no estado
                setClientes(clientes.map(cliente =>
                    cliente._id === clienteId ? clienteAtualizadoResponse : cliente
                ));

                // Limpar campos após a edição
                setClienteId(null);
                setNome("");
                setEmail("");

            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
            }
        }
    };

    const handleEdit = (cliente: Cliente, id: string) => {
        setNome(cliente.nome);
        setEmail(cliente.email);
        setClienteId(id);
    };

    return (
        <div style={styles.container}>
            <img src="/eu.png" alt="easter egg" style={{ width: '20px', height: 'auto', opacity: 0.05, }} />
            <h1 style={styles.title}>Clientes</h1>

            <div style={styles.form}>
                <label style={styles.label}>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={styles.input}
                />

                <label style={styles.label}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <button onClick={clienteId ? handleUpdate : handleCadastrar} style={styles.button}>
                    {clienteId ? 'Atualizar' : 'Cadastrar'}
                </button>
            </div>

            {clientes.map((cliente, index) => (
                <div key={cliente._id} style={styles.card}>
                    <p>
                        <strong>Nome:</strong> {cliente.nome}
                    </p>
                    <p>
                        <strong>Email:</strong> {cliente.email}
                    </p>
                    <button onClick={() => handleEdit(cliente, cliente._id)} style={styles.editButton}>
                        &#9998;
                    </button>
                    <button onClick={() => handleDelete(cliente._id, index)} style={styles.deleteButton}>
                        &#128465;
                    </button>
                </div>
            ))}
        </div>
    );
};

const styles = {

    container: {
        backgroundColor: "#00008B",
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "600px",
        margin: "auto",
        fontFamily: "'Roboto', sans-serif",
    },
    title: {
        textAlign: "center" as "left" | "right" | "center" | "justify" | "initial" | "inherit" | undefined,
    },
    form: {
        display: "flex",
        flexDirection: "column" as const,
        marginBottom: "20px",
    },
    label: {
        marginBottom: "5px",
    },
    input: {
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
    card: {
        backgroundColor: "#B0C4DE",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "10px",
        position: "relative" as const,
        color: "black"
    },
    deleteButton: {
        position: "absolute" as const,
        top: "10px",
        right: "10px",
        backgroundColor: "transparent",
        color: "black",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
    },
    editButton: {
        position: "absolute" as const,
        top: "10px",
        right: "40px",
        backgroundColor: "transparent",
        color: "black",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
    },
};

export default ClienteForm;