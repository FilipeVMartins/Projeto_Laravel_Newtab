import React, { useEffect, useState } from 'react';

//style
import '../../css/components/ModalRankingCandidaturas.css';


export default function ModalRankingCandidaturas (props) {

    
    const [rankingResult, setRankingResult] = useState(null);



    useEffect(
        () => {
            if (props.vagaID){
                const url = `/api/vagas/${props.vagaID}/candidaturas/ranking`

                let requestOptions = {
                    method: 'GET',
                };
        
                fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setRankingResult(result);
                })
                .catch(error => console.log('erro ao buscar vagas: ', error));
            }
        },
        [props.vagaID]
      );

    return (
        <div className={"modal-ranking-candidaturas " + (props.openModalRankingCandidaturasState ? '' : 'modal-close')}>
            <div className="screen-background-lock" onClick={(e) => props.openModalRankingCandidaturasFunction(e)}></div>
            <div className="modal-content">
                <h4>Ranking de Candidaturas para esta Vaga (ID: {props.vagaID})</h4>
                <div className="close-modal" onClick={(e) => props.openModalRankingCandidaturasFunction(e)}>
                    <span>X</span>
                </div>
                
                <div>
                    {rankingResult !== null && (rankingResult.data.length !== 0) ? (
                    <div className="candidaturas-list">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Título</th>
                            <th scope="col">Localizacao</th>
                            <th scope="col">Nível</th>

                            <th scope="col">Candidato</th>
                            <th scope="col">Profissão</th>
                            <th scope="col">Localizacao</th>
                            <th scope="col">Nível</th>
                            <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        Object.entries(rankingResult.data).map(([index, candidatura]) => {
                            return (
                            <tr key={'candidatura' + index}>
                                <th scope="row">{candidatura.id}</th>
                                <td>{candidatura.vaga.empresa}</td>
                                <td>{candidatura.vaga.titulo}</td>
                                <td>{candidatura.vaga.localizacao}</td>
                                <td>{candidatura.vaga.nivel}</td>

                                <td>{candidatura.pessoa.nome}</td>
                                <td>{candidatura.pessoa.profissao}</td>
                                <td>{candidatura.pessoa.localizacao}</td>
                                <td>{candidatura.pessoa.nivel}</td>
                                <td>{candidatura.score}</td>
                            </tr>
                            );
                        })
                        }
                        </tbody>
                        </table>
                        <div className="candidaturas-pagination">
                            {
                            (rankingResult.links.length > 3) ?
                                Object.entries(rankingResult.links).map(([index, link]) => {
                                    if (index != 0 && index != (rankingResult.links.length-1)){
                                    return (
                                        <a className={"page-link " + (link.label == this.state.actualPage ? 'active' : null)} key={'link' + index} id={'link'+index} href={link.url} onClick={(e) => this.getCandidaturas(e, link.url)} >{link.label}</a>
                                    );
                                    }
                                })
                            : null
                            }
                        </div>
                    </div>
                    
                    ) : (<span><i>Não foram encontradas Candidaturas para esta Vaga!</i></span>)}
                </div>

            </div>
            
        </div>
    );
};
