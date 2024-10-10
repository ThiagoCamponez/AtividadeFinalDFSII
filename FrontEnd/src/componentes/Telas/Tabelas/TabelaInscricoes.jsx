import { Button, Container, Table } from "react-bootstrap";
import { useContext } from "react";
import { ContextoUsuarioLogado } from "../../../App";
import { excluirInscricao } from "../../../servicos/inscricaoService"; 
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TabelaInscricoes(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function handleExcluirInscricao(inscricao) {
        const token = contextoUsuario.usuarioLogado.token;
        if (window.confirm(`Deseja excluir a inscrição do candidato ${inscricao.candidato.nome} na vaga ${inscricao.vaga.cargo}?`)) {
            excluirInscricao(inscricao, token)
            .then((resposta) => {
                props.setAtualizarTela(true); 
                alert(resposta.mensagem);
            }).catch((erro) => {
                alert("Erro ao enviar a requisição: " + erro.message);
            });
        }
    }

    return (
        <Container>
            <Table striped bordered hover className="text-center align-middle">
                <thead>
                    <tr>
                        <th>Candidato (CPF)</th>
                        <th>Nome do Candidato</th>
                        <th>Vaga (Código)</th>
                        <th>Cargo da Vaga</th>
                        <th>Data da Inscrição</th>
                        <th>Horário da Inscrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.listaDeInscricoes?.map((inscricao) => {
                        return (
                            <tr key={`${inscricao.candidato.cpf}-${inscricao.vaga.codigo}`}>
                                <td>{inscricao.candidato.cpf}</td>
                                <td>{inscricao.candidato.nome}</td>
                                <td>{inscricao.vaga.codigo}</td>
                                <td>{inscricao.vaga.cargo}</td>
                                <td>{new Date(inscricao.dataInscricao).toLocaleDateString('pt-BR')}</td>
                                <td>{inscricao.horarioInscricao}</td>
                                <td>
                                    <Button variant="warning" 
                                        className="me-2" 
                                        style={{ backgroundColor: '#5c25ca', borderColor: '#5c25ca', color: 'white' }}
                                        onClick={() => {
                                            props.setInscricaoSelecionada(inscricao); 
                                            props.setModoEdicao(true); 
                                            props.setExibirTabela(false); 
                                        }}>
                                        <FaEdit />
                                    </Button>{' '}
                                    <Button variant="danger"
                                        onClick={() => handleExcluirInscricao(inscricao)}>
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
    );
}
