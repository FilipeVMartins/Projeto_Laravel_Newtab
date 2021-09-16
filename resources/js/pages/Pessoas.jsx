import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//styles
import '../../css/pages/pessoas.css';

export default class Pessoas extends React.Component {

  state = {
    pessoas: null
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
        console.log(this.state.pessoas);
      })
      .catch(error => console.log('erro ao buscar pessoas: ', error));

  }










  async componentDidMount(){
    this.getPessoas();
  };



  render() {

    return (
      <div className="home-content">
        <div>
          <p>Gerenciar Pessoas</p>
        </div>



        <div className="form-pessoas">
          <form>

          </form>
        </div>





        <div>
        {this.state.pessoas !== null && (typeof this.state.pessoas.data !== 'undefined') ? (
          <div className="pessoas-list">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Localizacao</th>
                  <th scope="col">Nome</th>
                  <th scope="col">profissão</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
              {
              Object.entries(this.state.pessoas.data).map(([index, pessoa]) => {
                return (
                  <tr key={'pessoa' + index}>
                    <th scope="row">{pessoa.id}</th>
                    <td>{pessoa.localizacao}</td>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.profissao}</td>
                    <td>Botões</td>
                  </tr>
                );
              })
              }
              </tbody>
            </table>
            <div className="pessoas-pagination">
              {
              Object.entries(this.state.pessoas.links).map(([index, link]) => {
                if (index != 0 && index != (this.state.pessoas.links.length-1)){
                  return (
                    <a className="page-link" key={'link' + index} href={link.url} onClick={(e) => this.getPessoas(e, link.url)} >{link.label}</a>
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