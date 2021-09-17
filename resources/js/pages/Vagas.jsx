import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//styles
import '../../css/pages/vagas.css';

export default class Vagas extends React.Component {

  
  

  state = {
    vagas: null,
    actualPage: 1,
    formState: 0
  }




  // function to fetch vagas data after page load
  getVagas = (e=null, url = '/api/Vagas') => {
    if (e) {e.preventDefault()}

    let requestOptions = {
      method: 'GET',
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({vagas:result});
        this.setState({actualPage:result.current_page});
      })
      .catch(error => console.log('erro ao buscar vagas: ', error));
  }


  
  //function to create/update vagas
  postVagas = (e=null, url = '/api/Vagas') => {
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
          toast.success('Vaga Cadastrada!');
          this.getVagas();
          
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
          toast.success('Vaga Atualizada!');
          this.getVagas();
          
        } else if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
              toast.error(value2)
            })
          });
        }

      }
    })
    .catch(error => console.log('Erro ao cadastrar vaga: ', error));
  }



  deleteVaga = (e=null, url = '/api/Vagas') => {
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
        toast.success('Vaga Excluída!');
        this.getVagas();
        
      } else {
        toast.error('Erro ao excluir vaga')
      }
    })
    .catch(error => console.log('Erro ao excluir vaga: ', error));
  };


  
  editVaga = (e=null) => {
    //change form to edit
    this.setState({formState: 1});

    let vagaTR = e.target.parentNode.parentNode;

    // convert data from table row to json
    let vagaTRjson = {
      "id": vagaTR.querySelector(':scope > *:nth-child(1)').textContent,
      "empresa": vagaTR.querySelector(':scope > *:nth-child(2)').textContent,
      "titulo": vagaTR.querySelector(':scope > *:nth-child(3)').textContent,
      "descricao": vagaTR.querySelector(':scope > *:nth-child(4)').textContent,
      "localizacao": vagaTR.querySelector(':scope > *:nth-child(5)').textContent,
      "nivel": vagaTR.querySelector(':scope > *:nth-child(6)').textContent
    }

    //populate the form
    let form = document.querySelector('form');

    form.querySelector("#id").value = vagaTRjson.id;
    form.querySelector("#empresa").value = vagaTRjson.empresa;
    form.querySelector("#titulo").value = vagaTRjson.titulo;
    form.querySelector("#descricao").value = vagaTRjson.descricao;
    form.querySelector("#localizacao").value = vagaTRjson.localizacao;
    form.querySelector("#nivel").value = vagaTRjson.nivel;
  }

  editCancel = (e) => {
    e.preventDefault();
    document.querySelector('form').reset();
    //change form to edit
    this.setState({formState: 0});
  }



  async componentDidMount(){
    this.getVagas();
  };



  render() {

    return (
      <div className="vagas-content">
        <div className="page-title">
          <h2>Gerenciar Vagas</h2>
        </div>

        <div className="form-vagas">
          <form onSubmit={(e) => this.postVagas(e)}>
            
            <div hidden={ this.state.formState == 0 ? 'hidden' : '' }>
              <label htmlFor="id">Vaga ID: </label>
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
              <button hidden={ this.state.formState == 1 ? 'hidden' : '' } className="btn btn-primary" type="submit">Salvar Nova Vaga</button>
              <button hidden={ this.state.formState == 0 ? 'hidden' : '' } className="btn btn-primary" type="submit">Salvar Alterações de Vaga</button>
              <button hidden={ this.state.formState == 0 ? 'hidden' : '' } className="btn btn-warning" onClick={ e => this.editCancel(e)}>Cancelar</button>
            </div>
          </form>
        </div>

        <div>
        {this.state.vagas !== null && (typeof this.state.vagas.data !== 'undefined') ? (
          <div className="vagas-list">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Título</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Localizacao</th>
                  <th scope="col">Nível</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
              {
              Object.entries(this.state.vagas.data).map(([index, vaga]) => {
                return (
                  <tr key={'vaga' + index}>
                    <th scope="row">{vaga.id}</th>
                    <td>{vaga.empresa}</td>
                    <td>{vaga.titulo}</td>
                    <td>{vaga.descricao}</td>
                    <td>{vaga.localizacao}</td>
                    <td>{vaga.nivel}</td>
                    <td className="action-buttons">
                      <button className="btn btn-warning" title="Editar Vaga" onClick={ e => this.editVaga(e)}>✏️</button>
                      <button className="btn btn-danger" value={vaga.id} title="Excluir Vaga" onClick={ e => this.deleteVaga(e)}>❌</button>
                    </td>
                  </tr>
                );
              })
              }
              </tbody>
            </table>
            <div className="vagas-pagination">
              {
              Object.entries(this.state.vagas.links).map(([index, link]) => {
                if (index != 0 && index != (this.state.vagas.links.length-1)){
                  return (
                    <a className={"page-link " + (link.label == this.state.actualPage ? 'active' : null)} key={'link' + index} id={'link'+index} href={link.url} onClick={(e) => this.getVagas(e, link.url)} >{link.label}</a>
                  );
                }
              })
              }
            </div>
          </div>
        
        ) : null}
        </div>
      </div>
    );
  };
};