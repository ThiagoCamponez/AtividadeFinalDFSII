import { Button, Container, Row, Col } from "react-bootstrap";
import Pagina from "../Templates2/Pagina";
import FormCadInscricao from "./Formularios/FormCadInscricao"; 
import TabelaInscricoes from "./Tabelas/TabelaInscricoes"; 
import { useState, useEffect, useContext } from "react";
import { buscarTodasInscricoes } from "../../servicos/inscricaoService"; 
import { ContextoUsuarioLogado } from "../../App";
import { FaPlus } from "react-icons/fa";

export default function TelaInscricao(props) {

    const contextoUsuario = useContext(ContextoUsuarioLogado);

    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizarTela, setAtualizarTela] = useState(false); 
    const [listaDeInscricoes, setListaDeInscricoes] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        buscarTodasInscricoes(token).then((resposta) => {
            if (resposta.status) {
                setListaDeInscricoes(resposta.listaInscricoes);
            }
            setAtualizarTela(false); 
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [exibirTabela, atualizarTela]); 

    return (
        <Pagina>
            <div className="py-3 w-100">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col md={10}>
                                <h4>Gestão de Inscrição</h4>
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
                <TabelaInscricoes 
                    exibirTabela={exibirTabela} 
                    setExibirTabela={setExibirTabela}
                    listaDeInscricoes={listaDeInscricoes}
                    setAtualizarTela={setAtualizarTela} 
                /> 
                : 
                <FormCadInscricao 
                    exibirTabela={exibirTabela} 
                    setExibirTabela={setExibirTabela}
                    setAtualizarTela={setAtualizarTela} 
                />
            }
        </Pagina>
    );
}
