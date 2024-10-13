import { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button, Container, FloatingLabel } from 'react-bootstrap';
import BarraBusca from "../../busca/BarraBusca";
import CaixaSelecao from "../../busca/CaixaSelecao";
import { buscarTodosCandidatos } from "../../../servicos/candidatoService";  // Serviço de candidatos
import { ContextoUsuarioLogado } from "../../../App";
import { gravarInscricao } from "../../../servicos/inscricaoService";  // Serviço de inscrições
import TabelaItensVaga from "../Tabelas/TabelaItensVaga";
import {FaPlus, FaSave, FaTimes} from 'react-icons/fa';

export default function FormCadInscricao(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [validado, setValidado] = useState(false);
    const [candidatos, setCandidatos] = useState([]);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
    const [vagaSelecionada, setVagaSelecionada] = useState({});
    const [dataInscricao] = useState(new Date().toISOString().substring(0, 10));
    const horaInscricao = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        buscarTodosCandidatos(token).then((resposta) => {
            if (resposta.status) {
                setCandidatos(resposta.listaCandidatos);
            }
        });
    }, []); // Carrega candidatos ao montar o componente

    const [inscricao, setInscricao] = useState({
        candidato: {},
        vagas: [],
        dataInscricao: dataInscricao,
        horarioInscricao: horaInscricao // Mantém o horário atual no estado
    });

    const manipulaSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            const token = contextoUsuario.usuarioLogado.token;

            // Formata a data e o horário
            const dataFormatada = new Date().toISOString().substring(0, 10); // YYYY-MM-DD

            const horarioFormatado = horaInscricao; // Horário atual no formato correto

            // Monta o objeto de inscrição
            const novaInscricao = {
                cand_cpf: candidatoSelecionado.cpf, // CPF do candidato
                data_inscricao: dataFormatada, // Data no formato correto
                horario_inscricao: horarioFormatado, // Horário no formato correto
                vagas: inscricao.vagas.map(vaga => ({ codigo: vaga.codigo })) // Garantindo que cada vaga tenha o código
            };

            gravarInscricao(novaInscricao, token).then((resposta) => {
                if (resposta.status) {
                    alert(resposta.mensagem + " Candidato inscrito com sucesso!");
                    props.setExibirTabela(true);
                } else {
                    alert(resposta.mensagem);
                }
            }).catch((erro) => {
                alert(erro.message);
            });
            
            setValidado(false);
        } else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Container>
            <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                {/* Seção: Informações do Candidato */}
                <h4 className="mb-3 text-center">Informações do Candidato</h4>
                <hr />
                <Row>
                    <Col md="12">
                        <BarraBusca 
                            campoBusca={"nome"}
                            campoChave={"cpf"}
                            dados={candidatos}
                            funcaoSelecao={(candidato) => {
                                setCandidatoSelecionado(candidato);
                                setInscricao({ ...inscricao, candidato: candidato });
                            }}
                            placeHolder={"Selecione um candidato"}
                            valor={""} />
                    </Col>
                </Row>
                <Row className="mb-3 mt-5 d-flex align-items-center justify-content-center">
                    {candidatoSelecionado?.cpf && (
                    <Col md="4">
                        <FloatingLabel controlId="cpfCandidato" label="CPF do Candidato">
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={candidatoSelecionado.cpf} 
                            />
                        </FloatingLabel>
                    </Col>
                    )}
                    <Col md="4">
                        <FloatingLabel controlId="dataPlano" label="Data da Inscrição">
                            <Form.Control
                                type="date"
                                required
                                name="datainicio"
                                value={inscricao.dataInscricao}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a data do Plano.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col md="4">
                        <FloatingLabel controlId="horarioInscricao" label="Horário da Inscrição">
                            <Form.Control
                                type="text" 
                                required
                                name="horarioInscricao"
                                value={inscricao.horarioInscricao}
                                readOnly
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o horário da inscrição.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                {/* Seção: Vagas Selecionadas */}
                <h4 className="my-4 text-center">Seleção de Vagas</h4>
                <Row>
                    <Container className="border p-4">
                        <Row className="mb-3">
                            <Col md={2}>
                                <Form.Label className="fs-5">Selecione uma vaga:</Form.Label>
                            </Col>
                            <Col md={8}>
                                <CaixaSelecao 
                                    enderecoFonteDados={"http://localhost:4000/vagas"}
                                    campoChave={"codigo"}
                                    campoExibicao={"cargo"}
                                    funcaoSelecao={setVagaSelecionada}
                                    localLista={'listaVagas'}
                                    tokenAcesso={contextoUsuario.usuarioLogado.token}
                                />
                            </Col>
                            <Col md={2} className="d-flex justify-content-end">
                                <Button 
                                    onClick={() => {
                                        if (vagaSelecionada) {
                                            setInscricao({
                                                ...inscricao, 
                                                vagas: [...inscricao.vagas, {
                                                    "codigo": vagaSelecionada.codigo,
                                                    "cargo": vagaSelecionada.cargo,
                                                    "cidade": vagaSelecionada.cidade,
                                                }]
                                            });
                                        }
                                    }}
                                    style={{ backgroundColor: '#5c25ca', borderColor: '#5c25ca' }}>
                                    <FaPlus className="me-2"/>
                                    Adicionar Vaga
                                </Button>
                            </Col>
                            {vagaSelecionada?.codigo && (
                            <Row className="mb-2 mt-3">
                                <Col md={4}>
                                    <FloatingLabel controlId="codigoVaga" label="Código da Vaga">
                                        <Form.Control 
                                            type="text" 
                                            disabled 
                                            value={vagaSelecionada?.codigo || ""}/>
                                    </FloatingLabel>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="vagaSelecionada" label="Vaga Selecionada">
                                        <Form.Control 
                                            type="text" 
                                            disabled 
                                            value={vagaSelecionada?.cargo || ""}/>
                                    </FloatingLabel>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="vagaSelecionada" label="Cidade da Vaga">
                                        <Form.Control 
                                            type="text" 
                                            disabled 
                                            value={vagaSelecionada?.cidade || ""}/>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        )}
                        </Row>
                        {/* Lista de Vagas Selecionadas */}
                        <Row className="mt-3 d-flex align-items-center justify-content-center">
                            <p><strong>Lista de Vagas Selecionadas</strong></p>
                            <TabelaItensVaga
                                listaItens={inscricao.vagas}
                                setInscricao={setInscricao}
                                dadosInscricao={inscricao} 
                            />
                        </Row>
                    </Container>
                </Row>

                {/* Botões de Ação */}
                <Row className="mt-4 d-flex justify-content-center mb-3">
                    <Col md={4} className="d-flex justify-content-between">
                        <Button type="submit" className="w-100 me-5" style={{ backgroundColor: '#6800a8', borderColor: '#6800a8' }}>
                            <FaSave className="me-2"/>
                            Gravar
                        </Button>
                        <Button variant="secondary" className="w-100" onClick={() => props.setExibirTabela(true)}>
                            <FaTimes className="me-2"/>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
