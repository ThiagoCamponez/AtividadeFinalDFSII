import { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../../App';
import { gravarCandidato, alterarCandidato } from '../../../servicos/candidatoService';  
import InputMask from 'react-input-mask';
import {FaPlus, FaSave, FaTimes} from 'react-icons/fa';

export default function FormCadCandidato(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [candidato, setCandidato] = useState(props.candidatoSelecionado);
    const [validado, setValidado] = useState(false);
    

    function manipularMudanca(evento) {
        setCandidato({
            ...candidato,
            [evento.target.name]: evento.target.value
        });
    }

 function manipularSubmissao(evento) {
    const token = contextoUsuario.usuarioLogado.token;
    const formulario = evento.currentTarget;

    if (formulario.checkValidity()) {
        if (!props.modoEdicao) {
            const dados = { ...candidato };
            gravarCandidato(dados, token)
                .then((resposta) => {
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);  
                    }
                })
                .catch((erro) => {
                    alert("Erro ao gravar candidato: " + erro.message);
                });
        } else {
            const dados = { ...candidato };  
            alterarCandidato(dados, token)
                .then((resposta) => {
                    alert("Atualizado com sucesso!");
                    props.setModoEdicao(false);
                    props.setExibirTabela(true);
                    props.setCandidatoSelecionado({ 
                        cand_cpf: "", 
                        cand_nome: "", 
                        cand_endereco: "", 
                        cand_cidade: "",
                        cand_telefone: ""
                    });
                })
                .catch((erro) => {
                    alert("Erro ao alterar candidato: " + erro.message);
                });
        }

        setValidado(false);
    } else {
        setValidado(true);
    }

    evento.preventDefault();
    evento.stopPropagation();
}


    return (
        <Container>
            <Form noValidate onSubmit={manipularSubmissao} validated={validado}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="CPF:" className="mb-3">

                            <InputMask
                            mask="999.999.999-99" 
                            value={candidato.cpf}
                            onChange={manipularMudanca}
                            disabled={props.modoEdicao}>
                            {() => (
                                <Form.Control
                                    type="text"
                                    id="cand_cpf"
                                    name="cpf"
                                    required
                                    placeholder="Digite seu CPF"/>
                            )}
                            </InputMask>
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o CPF do candidato!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Nome:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do candidato"
                                    id="cand_nome"
                                    name="nome"
                                    onChange={manipularMudanca}
                                    value={candidato.nome}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome do candidato!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Endereço:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o endereço do candidato"
                                    id="cand_endereco"
                                    name="endereco"
                                    onChange={manipularMudanca}
                                    value={candidato.endereco}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o endereço do candidato!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Cidade:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a cidade do candidato"
                                    id="cand_cidade"
                                    name="cidade"
                                    onChange={manipularMudanca}
                                    value={candidato.cidade}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a cidade do candidato!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Telefone:" className="mb-3">
                            <InputMask
                            mask="(99) 99999-9999"
                            value={candidato.telefone}
                            onChange={manipularMudanca} >
                            {() => (
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o telefone do candidato"
                                    id="cand_telefone"
                                    name="telefone"
                                    required />
                            )}
                            </InputMask>
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o telefone do candidato!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='d-flex flex-column align-items-center justify-content-center mt-2 mb-2 '>
                    <Col md={4} className='d-flex align-items-center justify-content-center'>
                        <Button type="submit" className="w-100 me-5" style={{ backgroundColor: '#6800a8', borderColor: '#6800a8'}}>
                        <FaSave className="me-2"/>
                            {props.modoEdicao ? "Alterar" : "Gravar"}
                        </Button>

                        <Button className="w-100" variant="secondary" onClick={() => {props.setExibirTabela(true); }} >
                        <FaTimes className="me-2"/>
                            Cancelar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
