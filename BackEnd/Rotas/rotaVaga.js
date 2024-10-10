import { Router } from "express";
import VagaCtrl from "../Controle/vagaCtrl.js";

const rotaVaga = new Router();
const vagaCtrl = new VagaCtrl();

rotaVaga.post('/', vagaCtrl.gravar) 
        .put('/:codigo', vagaCtrl.atualizar) 
        .delete('/', vagaCtrl.excluir)
        .get('/', vagaCtrl.consultar)  
        .get('/:termo', vagaCtrl.consultar) 
        .delete('/:codigo', vagaCtrl.excluir);

export default rotaVaga;
