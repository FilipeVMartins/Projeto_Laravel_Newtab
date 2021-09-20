import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Example from '../components/Example';

//styles
import '../../css/pages/home.css';

export default class Home extends React.Component {

  state = {
    teste: '',
    teste2: null
  }





  render() {

    return (
      <div className="home-content">
        <Example />
      </div>
    );
  };
};
