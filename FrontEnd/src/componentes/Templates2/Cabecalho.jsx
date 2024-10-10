import { Navbar, Image } from "react-bootstrap";

export default function Cabecalho(props) {
    return (
        <Navbar className="bg-light shadow-lg w-90"> {/* Shadow e largura total */}
            <div className="d-flex justify-content-between align-items-center w-100">
                {/* Ícone de menu no lado esquerdo */}
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>

                {/* Logo centralizada */}
                <Image 
                    src="/logo_vagastop.png"  // Caminho para o logo no public
                    alt="Logo VagasTop"
                    className="mx-auto" 
                    style={{ height: '90px' }} // Altura da imagem (ajuste conforme necessário)
                />

                {/* Espaço vazio para manter o layout consistente */}
                <div style={{ width: '24px' }}></div> {/* Este espaço garante que a logo fique centralizada */}
            </div>
        </Navbar>
    );
}
