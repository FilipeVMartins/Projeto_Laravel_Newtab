import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//styles
import '../../css/pages/candidaturas.css';

export default class Candidaturas extends React.Component {

  state = {
    candidaturas: null,
    actualPage: 1,
    formState: 0
  }




  // function to fetch candidaturas data after page load
  getCandidaturas = (e=null, url = '/api/Candidaturas') => {
    if (e) {e.preventDefault()}

    let requestOptions = {
      method: 'GET',
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({candidaturas:result});
        this.setState({actualPage:result.current_page});
        console.log(result);
      })
      .catch(error => console.log('erro ao buscar candidaturas: ', error));
  }


  
  //function to create/update candidaturas
  postCandidaturas = (e=null, url = '/api/Candidaturas') => {
    if (e) e.preventDefault();

    const data = new FormData(e.target);
    const formValues = Object.fromEntries(data.entries());

    let body = JSON.stringify(formValues);

    fetch(url, {
        method: this.state.formState == 1 ? 'PUT' : 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: body
    })
    .then(response => response.json())
    .then(result => {

      //if create
      if (this.state.formState == 0){
        if (result.id){
          toast.success('Candidatura Cadastrada!');
          this.getCandidaturas();
          
        } else if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
              toast.error(value2)
            })
          });
        }

      } else

      //if update
      if (this.state.formState == 1){
        if (result == 1){
          toast.success('Candidatura Atualizada!');
          this.getCandidaturas();
          
        } else if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
              toast.error(value2)
            })
          });
        }

      }
    })
    .catch(error => console.log('Erro ao cadastrar candidatura: ', error));
  }



  deleteCandidatura = (e=null, url = '/api/Candidaturas') => {
    if (e) e.preventDefault();

    let body = JSON.stringify({id:e.target.value});

    fetch(url, {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json'
      },
      body: body
    })
    .then(response => response.json())
    .then(result => {
      if (result){
        toast.success('Candidatura Excluída!');
        this.getCandidaturas();
        
      } else {
        toast.error('Erro ao excluir candidatura')
      }
    })
    .catch(error => console.log('Erro ao excluir candidatura: ', error));
  };


  
  editCandidatura = (e=null) => {
    //change form to edit
    this.setState({formState: 1});

    let candidaturaTR = e.target.parentNode.parentNode.parentNode;

    // convert data from table row to json
    let candidaturaTRjson = {
      "id": candidaturaTR.querySelector(':scope > *:nth-child(1)').textContent,
      "empresa": candidaturaTR.querySelector(':scope > *:nth-child(2)').textContent,
      "titulo": candidaturaTR.querySelector(':scope > *:nth-child(3)').textContent,
      "descricao": candidaturaTR.querySelector(':scope > *:nth-child(4)').textContent,
      "localizacao": candidaturaTR.querySelector(':scope > *:nth-child(5)').textContent,
      "nivel": candidaturaTR.querySelector(':scope > *:nth-child(6)').textContent
    }

    //populate the form
    let form = document.querySelector('form');

    form.querySelector("#id").value = candidaturaTRjson.id;
    form.querySelector("#empresa").value = candidaturaTRjson.empresa;
    form.querySelector("#titulo").value = candidaturaTRjson.titulo;
    form.querySelector("#descricao").value = candidaturaTRjson.descricao;
    form.querySelector("#localizacao").value = candidaturaTRjson.localizacao;
    form.querySelector("#nivel").value = candidaturaTRjson.nivel;
  }

  editCancel = (e) => {
    e.preventDefault();
    document.querySelector('form').reset();
    //change form to edit
    this.setState({formState: 0});
  }



  async componentDidMount(){
    this.getCandidaturas();
  };



  render() {

    return (
      <div className="candidaturas-content">
        <div className="page-title">
          <h2>Gerenciar Candidaturas</h2>
        </div>

        <div className="form-candidaturas">
          <form onSubmit={(e) => this.postCandidaturas(e)}>
            
            <div hidden={ this.state.formState == 0 ? 'hidden' : '' }>
              <label htmlFor="id">Candidatura ID: </label>
              <input readOnly type="text" className="form-control" id="id" name="id" />
            </div>

            <div>
              <label htmlFor="empresa">Empresa: </label>
              <input className="form-control" type="text" id="empresa" name="empresa" maxLength="100" />
            </div>

            <div>
              <label htmlFor="titulo">Título: </label>
              <input className="form-control" type="text" id="titulo" name="titulo" maxLength="100" />
            </div>

            <div>
              <label htmlFor="descricao">Descrição: </label>
              <textarea className="form-control" type="text" id="descricao" name="descricao" maxLength="65000" ></textarea>
            </div>

            <div>
              <label htmlFor="localizacao">Localização: </label>
              <select className="form-control" name="localizacao" id="localizacao" maxLength="1">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
              </select>
            </div>

            <div>
              <label htmlFor="nivel">Nível</label>
              <select className="form-control" name="nivel" id="nivel" maxLength="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
              </select>
            </div>

            <div>
              <button hidden={ this.state.formState == 1 ? 'hidden' : '' } className="btn btn-primary" type="submit">Salvar Nova Candidatura</button>
              <button hidden={ this.state.formState == 0 ? 'hidden' : '' } className="btn btn-primary" type="submit">Salvar Alterações de Candidatura</button>
              <button hidden={ this.state.formState == 0 ? 'hidden' : '' } className="btn btn-warning" onClick={ e => this.editCancel(e)}>Cancelar</button>
            </div>
          </form>
        </div>

        <div>
        {this.state.candidaturas !== null && (typeof this.state.candidaturas.data !== 'undefined') ? (
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
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
              {
              Object.entries(this.state.candidaturas.data).map(([index, candidatura]) => {
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
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-warning" title="Editar Candidatura" onClick={ e => this.editCandidatura(e)}>✏️</button>
                        <button className="btn btn-danger" value={candidatura.id} title="Excluir Candidatura" onClick={ e => this.deleteCandidatura(e)}>❌</button>
                      </div>
                    </td>
                  </tr>
                );
              })
              }
              </tbody>
            </table>
            <div className="candidaturas-pagination">
              {
              (this.state.candidaturas.links.length > 3) ?
                Object.entries(this.state.candidaturas.links).map(([index, link]) => {
                  if (index != 0 && index != (this.state.candidaturas.links.length-1)){
                    return (
                      <a className={"page-link " + (link.label == this.state.actualPage ? 'active' : null)} key={'link' + index} id={'link'+index} href={link.url} onClick={(e) => this.getCandidaturas(e, link.url)} >{link.label}</a>
                    );
                  }
                })
              : null
              }
            </div>
          </div>
        
        ) : (<span><i>Não foram encontradas Candidaturas cadastradas do Sistema!</i></span>)
        }
        </div>
      </div>
    );
  };
};