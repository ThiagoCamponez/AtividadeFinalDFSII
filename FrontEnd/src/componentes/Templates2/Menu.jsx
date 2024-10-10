import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function Menu(props) {

    return (
        <Navbar expand="lg" className="bg-light shadow-sm" sticky="top"> {/* Cor de fundo clara e shadow */}
            <Container>
                <Navbar.Brand as={Link} to="/"> {/* Link da home no título */}
                    VagasTop
                </Navbar.Brand>

                {/* Ícone sandwich para colapsar o menu em telas pequenas */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav"> {/* Collapse para responsividade */}
                    <Nav className="me-auto"> {/* Espaçamento para a direita */}
                        {/* Dropdowns de Cadastros */}
                        <NavDropdown title="Cadastros" id="cadastros-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/candidatos">Candidatos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/vagas">Vagas</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdowns de Operações */}
                        <NavDropdown title="Operações" id="operacoes-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/inscricoes">Inscrições</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdowns de Relatórios */}
                        <NavDropdown title="Relatórios" id="relatorios-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/relatorios/candidatos">Candidatos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/relatorios/vagas">Vagas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/relatorios/inscricoes">Inscrições</NavDropdown.Item>
                        </NavDropdown>

                        {/* Links simples */}
                        <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
                        <Nav.Link as={Link} to="/sair">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
