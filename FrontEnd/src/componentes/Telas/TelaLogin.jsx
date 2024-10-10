import React from 'react';
import { Container } from "react-bootstrap";
import FormLogin from "./Formularios/FormLogin";
import './TelaLogin.css'; // Importa o arquivo CSS com o background

export default function TelaLogin(props) {
    return (
        <div className="login-background"> {/* Aplica a classe de background */}
            <Container className='d-flex flex-column align-items-center justify-content-center vh-100'>
                <h1 className='mb-3 display-3 fw-bold'>
                    <span style={{ color: '#6800a8' }}>Vagas</span>
                    <span style={{ color: '#FFF555' }}>Top</span>
                </h1>
                <FormLogin />
            </Container>
        </div>
    );
}
