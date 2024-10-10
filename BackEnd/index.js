import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVaga from './Rotas/rotaVaga.js';
import rotaCandidatoVaga from './Rotas/rotaCandidatoVaga.js';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';

dotenv.config(); 

const host = '0.0.0.0';
const porta = 4000;

const app = express();


app.use(session({
    secret: process.env.CHAVE_SECRETA, 
    resave: true, 
    saveUninitialized: true, 
    cookie: { 
        httpOnly: false,
        secure: false, 
        sameSite: false,
        maxAge: 1000 * 60 * 15  
    }
}));


app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000","http://192.168.0.101:3000"],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/candidatos', verificarAutenticacao, rotaCandidato); 
app.use('/vagas', verificarAutenticacao, rotaVaga); 
app.use('/inscricoes', verificarAutenticacao, rotaCandidatoVaga); 
app.use('/autenticacao', rotaAutenticacao); 

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
