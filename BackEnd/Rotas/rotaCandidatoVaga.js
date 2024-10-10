import { Router } from "express";
import CandidatoVagaCtrl from "../Controle/candidatoVagaCtrl.js";

const rotaCandidatoVaga = new Router();
const candidatoVagaCtrl = new CandidatoVagaCtrl();

rotaCandidatoVaga
    .get('/', candidatoVagaCtrl.consultar)  
    .get('/:termo', candidatoVagaCtrl.consultar)  
    .post('/', candidatoVagaCtrl.gravar)   
    .delete('/:cand_cpf/:vaga_codigo', candidatoVagaCtrl.excluir); 
    
export default rotaCandidatoVaga;
