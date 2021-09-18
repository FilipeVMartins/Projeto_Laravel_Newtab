import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//styles
import '../../css/pages/pessoas.css';

export default class Pessoas extends React.Component {

  state = {
    pessoas: null,
    actualPage: 1,
    formState: 0
  }



  // function to fetch pessoas data after page load
  getPessoas = (e=null, url = '/api/Pessoas') => {
    if (e) {e.preventDefault()}

    let requestOptions = {
      method: 'GET',
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({pessoas:result});
        this.setState({actualPage:result.current_page});
      })
      .catch(error => console.log('erro ao buscar pessoas: ', error));
  }


  
  //function to create/update pessoas
  postPessoas = (e=null, url = '/api/Pessoas') => {
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
          toast.success('Pessoa Cadastrada!');
          this.getPessoas();
          
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
          toast.success('Pessoa Atualizada!');
          this.getPessoas();
          
        } else if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
              toast.error(value2)
            })
          });
        }

      }
    })
    .catch(error => console.log('Erro ao cadastrar pessoa: ', error));
  }



  deletePessoa = (e=null, url = '/api/Pessoas') => {
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
        toast.success('Pessoa Excluída!');
        this.getPessoas();
        
      } else {
        toast.error('Erro ao excluir pessoa')
      }
    })
    .catch(error => console.log('Erro ao excluir pessoa: ', error));
  };


  
  editPessoa = (e=null) => {
    //change form to edit
    this.setState({formState: 1});

    let pessoaTR = e.target.parentNode.parentNode.parentNode;

    // convert data from table row to json
    let pessoaTRjson = {
      "id": pessoaTR.querySelector(':scope > *:nth-child(1)').textContent,
      "nome": pessoaTR.querySelector(':scope > *:nth-child(2)').textContent,
      "profissao": pessoaTR.querySelector(':scope > *:nth-child(3)').textContent,
      "localizacao": pessoaTR.querySelector(':scope > *:nth-child(4)').textContent,
      "nivel": pessoaTR.querySelector(':scope > *:nth-child(5)').textContent
    }

    //populate the form
    let form = document.querySelector('form');

    form.querySelector("#id").value = pessoaTRjson.id;
    form.querySelector("#nome").value = pessoaTRjson.nome;
    form.querySelector("#profissao").value = pessoaTRjson.profissao;
    form.querySelector("#localizacao").value = pessoaTRjson.localizacao;
    form.querySelector("#nivel").value = pessoaTRjson.nivel;
  }

  editCancel = (e) => {
    e.preventDefault();
    document.querySelector('form').reset();
    //change form to edit
    this.setState({formState: 0});
  }



  async componentDidMount(){
    this.getPessoas();
  };



  render() {

    return (
      <div className="pessoas-content">
        <div className="page-title">
          <h2>Gerenciar Pessoas</h2>
        </div>

        <div className="form-pessoas">
          <form onSubmit={(e) => this.postPessoas(e)}>
            
            <div hidden={ this.state.formState == 0 ? 'hidden' : '' }>
              <label htmlFor="id">Pessoa ID: </label>
              <input readOnly type="text" className="form-control" id="id" name="id" />
            </div>

            <div>
              <label htmlFor="nome">Nome: </label>
              <input className="form-control" type="text" id="nome" name="nome" maxLength="100" />
            </div>

            <div>
              <label htmlFor="profissao">Profissão: </label>
              <input className="form-control" type="text" id="profissao" name="profissao" maxLength="100" />
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
              <button hidden={ this.state.formState == 1 ? 'hidden' : '' } className="btn btn-primary" type="submit">Salvar Nova Pessoa</button>

              <button hidden={ this.state.formState == 0 ? 'hidden' : '' } className="btn btn-primary" type="submit">Salvar Alterações de Pessoa</button>
              <button hidden={ this.state.formState == 0 ? 'hidden' : '' } className="btn btn-warning" onClick={ e => this.editCancel(e)}>Cancelar</button>
            </div>
          </form>
        </div>

        <div>
        {this.state.pessoas !== null && (typeof this.state.pessoas.data !== 'undefined') ? (
          <div className="pessoas-list">
            <div className="pessoas-pagination">
              {
              (this.state.pessoas.links.length > 3) ?
                Object.entries(this.state.pessoas.links).map(([index, link]) => {
                  if (index != 0 && index != (this.state.pessoas.links.length-1)){
                    return (
                      <a className={"page-link " + (link.label == this.state.actualPage ? 'active' : null)} key={'link' + index} id={'link'+index} href={link.url} onClick={(e) => this.getPessoas(e, link.url)} >{link.label}</a>
                    );
                  }
                })
              : null
              }
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Profissão</th>
                  <th scope="col">Localizacao</th>
                  <th scope="col">Nível</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
              {
              Object.entries(this.state.pessoas.data).map(([index, pessoa]) => {
                return (
                  <tr key={'pessoa' + index}>
                    <th scope="row">{pessoa.id}</th>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.profissao}</td>
                    <td>{pessoa.localizacao}</td>
                    <td>{pessoa.nivel}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-warning" title="Editar Pessoa" onClick={ e => this.editPessoa(e)}>✏️</button>
                        <button className="btn btn-danger" value={pessoa.id} title="Excluir Pessoa" onClick={ e => this.deletePessoa(e)}>❌</button>
                      </div>
                    </td>
                  </tr>
                );
              })
              }
              </tbody>
            </table>
            <div className="pessoas-pagination">
              {
              (this.state.pessoas.links.length > 3) ?
                Object.entries(this.state.pessoas.links).map(([index, link]) => {
                  if (index != 0 && index != (this.state.pessoas.links.length-1)){
                    return (
                      <a className={"page-link " + (link.label == this.state.actualPage ? 'active' : null)} key={'link' + index} id={'link'+index} href={link.url} onClick={(e) => this.getPessoas(e, link.url)} >{link.label}</a>
                    );
                  }
                })
              : null
              }
            </div>
          </div>
        
        ) : (<span><i>Não foram encontradas Pessoas cadastradas do Sistema!</i></span>)
        }
        </div>
      </div>
    );
  };
};