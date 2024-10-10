import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

export default function Pagina(props) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Cabecalho /> 
            <Menu />
            <Container className="flex-grow-1">
                {props.children}
            </Container>
            <Rodape informacoes="Todos os direitos reservados - VagasTop.com" />
        </div>
    );
}
