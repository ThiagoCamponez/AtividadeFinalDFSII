import { Button, Container, Table } from "react-bootstrap";
import { excluir } from "../../../servicos/vagaService"; 
import { ContextoUsuarioLogado } from "../../../App";
import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TabelaVagas(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function excluirVaga(vaga) {
        const token = contextoUsuario.usuarioLogado.token;
        if (window.confirm(`Deseja excluir a vaga ${vaga.cargo}?`)) {
            excluir(vaga, token).then((resposta) => {
                props.setAtualizarTela(true);
                alert(resposta.mensagem);
            }).catch((erro) => {
                alert(erro.message); 
            });
        }
    }

    function alterarVaga(vaga) {
        props.setVagaSelecionada(vaga); 
        props.setModoEdicao(true);      
        props.setExibirTabela(false);  
    }

    return (
        <>
            <Container>
                <Table striped bordered hover className="text-center align-middle">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cargo</th>
                            <th>Salário</th>
                            <th>Cidade</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaDeVagas?.map((vaga) => {
                                return (
                                    <tr key={vaga.codigo}>
                                        <td>{vaga.codigo}</td>
                                        <td>{vaga.cargo}</td>
                                        <td>{vaga.salario}</td>
                                        <td>{vaga.cidade}</td>
                                        <td>{vaga.quantidade}</td>
                                        <td>
                                        <Button 
                                                variant="warning" 
                                                className="me-2" 
                                                style={{ backgroundColor: '#5c25ca', borderColor: '#5c25ca', color: 'white' }}
                                                onClick={() => {
                                                    alterarVaga(vaga);
                                                }}>
                                                <FaEdit />
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                onClick={() => {
                                                    excluirVaga(vaga);
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
