import { Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import {FaTimes} from 'react-icons/fa';

export default function TabelaItensVaga(props) {
    return (
        <Container className="m-3">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código da Vaga</th>
                    <th>Descrição da Vaga</th>
                    <th>Cidade da Vaga</th>
                    <th className="text-center">Excluir</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.listaItens?.map((item, indice) => {
                        return <tr key={indice}>
                            <td>{item.codigo}</td>
                            <td>{item.cargo}</td>
                            <td>{item.cidade}</td>
                            <td className="text-center">
                                <Button  onClick={()=>{
                                    const lista = props.listaItens.filter((proj) => proj.codigo !== item.codigo); 
                                    props.setInscricao({...props.dadosInscricao, vagas:lista});
                                }}>
                                    <FaTimes />
                                </Button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        </Container>
    )
}

