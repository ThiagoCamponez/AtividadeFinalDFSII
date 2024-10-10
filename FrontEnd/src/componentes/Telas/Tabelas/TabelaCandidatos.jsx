import { Button, Container, Table } from "react-bootstrap";
import { excluir } from "../../../servicos/candidatoService"; 
import { ContextoUsuarioLogado } from "../../../App";
import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TabelaCandidatos(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function excluirCandidato(candidato) {
        const token = contextoUsuario.usuarioLogado.token;
        if (window.confirm(`Deseja excluir o candidato ${candidato.nome}?`)) {
            excluir(candidato, token).then((resposta) => {
                props.setAtualizarTela(true);
                alert(resposta.mensagem);
            }).catch((erro) => {
                alert(erro.message);
            });
        }
    }

    function alterarCandidato(candidato) {
        props.setCandidatoSelecionado(candidato);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    return (
        <>
            <Container>
                <Table striped bordered hover className="text-center align-middle">
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaDeCandidatos?.map((candidato) => {
                                return (
                                    <tr key={candidato.cpf}>
                                        <td>{candidato.cpf}</td>
                                        <td>{candidato.nome}</td>
                                        <td>{candidato.endereco}</td>
                                        <td>{candidato.cidade}</td>
                                        <td>{candidato.telefone}</td>
                                        <td>
                                            <Button 
                                                variant="warning" 
                                                className="me-2" 
                                                style={{ backgroundColor: '#5c25ca', borderColor: '#5c25ca', color: 'white' }}
                                                onClick={() => {
                                                    alterarCandidato(candidato);
                                                }}>
                                                <FaEdit />
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                onClick={() => {
                                                    excluirCandidato(candidato);
                                                }}>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
