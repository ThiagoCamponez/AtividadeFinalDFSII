import { Container, Form, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { login } from '../../../servicos/loginService';

export default function FormLogin(props) {
    const contexto = useContext(ContextoUsuarioLogado);
    const [usuario, setUsuario] = useState({
        usuario: "",
        senha: ""
    });

    function realizarLogin(evento) {
        login(usuario.usuario, usuario.senha).then((resposta) => {
            if (resposta?.status) {
                contexto.setUsuarioLogado({
                    nome: usuario.usuario,
                    logado: true,
                    token: resposta.token,
                });
            }
            else{
                alert(resposta.mensagem);
            }
        }).catch((erro)=>{
            alert(erro.message);
        });
        evento.stopPropagation();
        evento.preventDefault();
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    }

    return (
        <Container className="border p-5 m-5 w-50 mx-auto">
            <Form onSubmit={realizarLogin}>
                <Form.Group className="mb-3" controlId="usuario">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o nome do usuário"
                        value={usuario.usuario} 
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control type="password"
                        id='senha'
                        name='senha'
                        placeholder="Informe a senha de acesso."
                        value={usuario.senha}
                        onChange={manipularMudanca} />
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button className="mt-4 btn-lg custom-button" type="submit" style={{ backgroundColor: '#6800a8', borderColor: '#6800a8' }}>
                        Entrar
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
