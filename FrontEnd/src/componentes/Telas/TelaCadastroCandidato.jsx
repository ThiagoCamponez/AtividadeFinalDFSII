import { Button, Container, Row, Col } from "react-bootstrap";
import FormCadCandidato from "./Formularios/FormCadCandidato";
import Pagina from "../Templates2/Pagina"; 
import { useEffect, useState, useContext } from "react";
import TabelaCandidatos from "./Tabelas/TabelaCandidatos"; 
import { consultarTodos } from "../../servicos/candidatoService"; 
import { ContextoUsuarioLogado } from "../../App";
import { FaPlus } from "react-icons/fa";

export default function TelaCadastroCandidato(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({
        cpf: "",
        nome: "",
        endereco: "",
        cidade: "",
        telefone: ""
    }); 
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeCandidatos, setListaDeCandidatos] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            if (resposta.status) {
                setListaDeCandidatos(resposta.listaCandidatos); 
            } else {
                alert(resposta.mensagem);
            }
        }).catch((erro) => {
            alert("Erro ao consultar candidatos: " + erro.message);
        });
    }, [contextoUsuario.usuarioLogado.token, exibirTabela, modoEdicao, atualizarTela]); 

    return (
        <div>
            <Pagina>
                <div className="py-3 w-100">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col md={10}>
                                <h4>Cadastro de Candidatos</h4>
                            </Col>
                            <Col md={2} className="text-end">
                                {/* Condicional para exibir o botão apenas quando a tabela está visível */}
                                {exibirTabela && (
                                    <Button className="w-100" variant="primary" onClick={() => setExibirTabela(false)} style={{ backgroundColor: '#6800a8', borderColor: '#6800a8'}}>
                                        <FaPlus className="me-2"/>
                                        Adicionar
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>

                {
                    exibirTabela ? (
                        <TabelaCandidatos listaDeCandidatos={listaDeCandidatos}
                                          setExibirTabela={setExibirTabela} 
                                          candidatoSelecionado={candidatoSelecionado}
                                          setCandidatoSelecionado={setCandidatoSelecionado}
                                          setModoEdicao={setModoEdicao}
                                          setAtualizarTela={setAtualizarTela}/>
                    ) : (
                        <FormCadCandidato setExibirTabela={setExibirTabela}
                                          candidatoSelecionado={candidatoSelecionado}
                                          setCandidatoSelecionado={setCandidatoSelecionado}
                                          setModoEdicao={setModoEdicao} 
                                          modoEdicao={modoEdicao}
                                          setAtualizarTela={setAtualizarTela}/>
                    )
                }
            </Pagina>
        </div>
    );
}
