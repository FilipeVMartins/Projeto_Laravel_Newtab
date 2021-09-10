import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//styles
import '../../css/pages/vagas.css';

export default class Vagas extends React.Component {

  state = {
    teste: '',
    teste2: null
  }





  render() {

    return (
      <div className="home-content">
        <p>teste Vagas</p>
      </div>
    );
  };
};