import { Link } from 'react-router-dom';
import Pagina from "../Templates2/Pagina";
import './TelaMenu.css';

export default function TelaMenu(props) {
    return (
        <Pagina>
            <main>
                <section aria-label="Artigos Recentes">
                    <h2>Vagas Disponíveis</h2>
    
                    <div className="articles-container">
                        
                        <article>
                            <h2>Designer Gráfico</h2>
                            <p>Oportunidade para designer gráfico com experiência em Adobe Suite.</p>
                            <Link to="/inscricoes">Acesse a vaga</Link>
                        </article>
    
                        <article>
                            <h2>Desenvolvedor Mobile</h2>
                            <p>Buscamos desenvolvedor mobile com foco em Android e iOS.</p>
                            <Link to="/inscricoes">Acesse a vaga</Link>
                        </article>
    
                        <article>
                            <h2>Gerente de Projetos</h2>
                            <p>Estamos recrutando gerente de projetos com experiência em metodologias ágeis.</p>
                            <Link to="/inscricoes">Acesse a vaga</Link>
                        </article>
    
                        <article>
                            <h2>Engenheiro de Software</h2>
                            <p>Engenheiro de software com experiência em arquitetura de sistemas distribuídos.</p>
                            <Link to="/inscricoes">Acesse a vaga</Link>
                        </article>
    
                        <article>
                            <h2>Desenvolvedor Front-End</h2>
                            <p>Vaga para desenvolvedor front-end com foco em React e Angular.</p>
                            <Link to="/inscricoes">Acesse a vaga</Link>
                        </article>
    
                        <article>
                            <h2>Especialista em Redes</h2>
                            <p>Oportunidade para especialista em redes com certificações CISCO.</p>
                            <Link to="/inscricoes">Acesse a vaga</Link>
                        </article>
                    </div>
                </section>
            </main>
        </Pagina>
    );
}
