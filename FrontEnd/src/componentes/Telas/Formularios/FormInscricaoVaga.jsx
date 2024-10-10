import { Button, FloatingLabel, Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { gravarVaga, alterarVaga } from '../../../servicos/vagaService';  
import {FaPlus, FaSave, FaTimes} from 'react-icons/fa';

export default function FormCadastroVaga(props) {

    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [vaga, setVaga] = useState(props.vagaSelecionada || {
        vaga_codigo: "",
        vaga_cargo: "",
        vaga_salario: "",
        vaga_cidade: "",
        vaga_quantidade: ""
    });
    const [validado, setValidado] = useState(false);
    
    useEffect(() => {
        if (props.modoEdicao && props.vagaSelecionada) {
            const vagaSelecionada = {
                vaga_codigo: props.vagaSelecionada.codigo,
                vaga_cargo: props.vagaSelecionada.cargo,
                vaga_salario: props.vagaSelecionada.salario,
                vaga_cidade: props.vagaSelecionada.cidade,
                vaga_quantidade: props.vagaSelecionada.quantidade
            };
            setVaga(vagaSelecionada); 
        }
    }, [props.modoEdicao, props.vagaSelecionada]);

    function manipularMudanca(evento) {
        setVaga({
            ...vaga,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;

        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                gravarVaga(vaga, token).then((resposta) => {
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);
                    }
                }).catch((erro) => {
                    alert(erro.message);
                });
            } else {
                alterarVaga(vaga, token).then((resposta) => {
                    alert("Vaga atualizada com sucesso!");
                    props.setModoEdicao(false);
                    props.setVagaSelecionada({ vaga_codigo:"", vaga_cargo: "", vaga_salario: "", vaga_cidade: "", vaga_quantidade: "" });
                    props.setExibirTabela(true);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
            setValidado(false);
        } else {
            setValidado(true);
        }
        evento.stopPropagation();
        evento.preventDefault();
    }

    return (
        <Container>
            <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-4">
                    <Col md="6">
                        <FloatingLabel controlId="vaga_cargo" label="Cargo da Vaga" className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                name="vaga_cargo"
                                value={vaga.vaga_cargo}
                                onChange={manipularMudanca}
                                placeholder="Ex: Desenvolvedor"
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe o cargo da vaga!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col md="6">
                        <FloatingLabel controlId="vaga_salario" label="Salário" className="mb-3">
                            <Form.Control
                                required
                                type="number"
                                name="vaga_salario"
                                value={vaga.vaga_salario}
                                onChange={manipularMudanca}
                                placeholder="Ex: 5000.00"
                                step="0.01"
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe o salário da vaga!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md="6">
                        <FloatingLabel controlId="vaga_cidade" label="Cidade" className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                name="vaga_cidade"
                                value={vaga.vaga_cidade}
                                onChange={manipularMudanca}
                                placeholder="Ex: São Paulo"
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a cidade da vaga!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col md="6">
                        <FloatingLabel controlId="vaga_quantidade" label="Quantidade de Vagas" className="mb-3">
                            <Form.Control
                                required
                                type="number"
                                name="vaga_quantidade"
                                value={vaga.vaga_quantidade}
                                onChange={manipularMudanca}
                                placeholder="Ex: 3"
                            />
                            <Form.Control.Feedback type="invalid">Por favor, informe a quantidade de vagas!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="d-flex flex-column align-items-center justify-content-center mt-2 mb-2">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <Button type="submit" className="w-100 me-5" style={{ backgroundColor: '#6800a8', borderColor: '#6800a8' }}>
                        <FaSave className="me-2"/>
                            {props.modoEdicao ? "Alterar" : "Gravar"}
                        </Button>

                        <Button className="w-100" variant="secondary" onClick={() => {props.setExibirTabela(true);}} >
                        <FaTimes className="me-2"/>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
