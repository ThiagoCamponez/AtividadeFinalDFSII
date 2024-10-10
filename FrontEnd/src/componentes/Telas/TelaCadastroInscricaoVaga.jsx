import { Button, Container, Row, Col } from "react-bootstrap";
import FormInscricaoVaga from "./Formularios/FormInscricaoVaga"; 
import Pagina from "../Templates2/Pagina"; 
import { useEffect, useState, useContext } from "react";
import TabelaVagas from "./Tabelas/TabelaVagas";
import { consultarTodos } from "../../servicos/vagaService"; 
import { ContextoUsuarioLogado } from "../../App";
import { FaPlus } from "react-icons/fa";

export default function TelaCadastroInscricaoVaga(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true); 
    const [modoEdicao, setModoEdicao] = useState(false); 
    const [atualizarTela, setAtualizarTela] = useState(false); 
    const [vagaSelecionada, setVagaSelecionada] = useState({
        cargo: "",
        salario: 0,
        cidade: "",
        quantidade: ""
    }); 

    const [listaDeVagas, setListaDeVagas] = useState([]); 

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            if (resposta.status) {
                setListaDeVagas(resposta.listaVagas);
            }
            setAtualizarTela(false); 
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [exibirTabela, atualizarTela]); 
   
    return (
        <div>
            <Pagina>
            <div className="py-3 w-100">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col md={10}>
                                <h4>Cadastro de Vagas</h4>
                            </Col>
                            <Col md={2} className="text-end">
                                {/* Condicional para exibir o botão apenas quando a tabela está visível */}
                                {exibirTabela && (
                                    <Button className="w-100" variant="primary" onClick={() => setExibirTabela(false)} style={{ backgroundColor: '#6800a8', borderColor: '#6800a8'}}>
                                        <FaPlus className="me-2" />
                                        Adicionar
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
                {
                    exibirTabela ? 
                        <TabelaVagas 
                            listaDeVagas={listaDeVagas} 
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setVagaSelecionada={setVagaSelecionada}
                            setAtualizarTela={setAtualizarTela}
                        /> :
                        <FormInscricaoVaga 
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            modoEdicao={modoEdicao}
                            vagaSelecionada={vagaSelecionada}
                            setVagaSelecionada={setVagaSelecionada}
                            setAtualizarTela={setAtualizarTela} 
                        />
                }
            </Pagina>
        </div>
    );
}
