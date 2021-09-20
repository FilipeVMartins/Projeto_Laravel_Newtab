import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Sobre o Projeto</div>

                        <div className="card-body">
                            <p>O projeto conta com 3 CRUD's:</p>

                            <ul>
                                <li>
                                    <p>Pessoas: Tendo ID como PK, representa os candidatos à uma vaga.</p>
                                </li>

                                <li>
                                    <p>Vagas: Representa Vagas anunciadas por empresas e sua PK é o campo 'ID'. Logo, conclui-se que: 1- o campo 'titulo' não 
                                    representa uma informação única, pois podem haver diferentes vagas com o mesmo título; 2- Uma mesma empresa pode ter 
                                    várias vagas, logo considera-se que o campo 'empresa' está desnormalizado.</p>
                                    <p> O CRUD de Vagas também conta com o campo calculado 'candidaturas' em seus retornos, que informa quantas pessoas 
                                        se candidataram para uma vaga.</p>
                                </li>

                                <li>
                                    <p>Candidaturas: Foi utilizado um campo ID como chave primária para facilitar operações, porém foi identificada a restrição 
                                    de que duas candidaturas com a mesma vaga e pessoa seriam uma candidatura duplicada, tal chave composta não foi declarada nas migrations,
                                    mas essa restrição foi adicionada nas validações dos métodos update e create do controller de candidaturas.</p>
                                    <p>Antes de uma candidatura ser salva pela model, foi adicionado o campo 'score', calculado conforme especificação do projeto.</p>
                                </li>
                            </ul>

                            <p>No módulo de Vagas existe a funcionalidade 'Ver Ranking', que permite visualizar em uma modal as candidaturas para uma determinada vaga 
                                ordenadas pelo campo 'score'.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;
