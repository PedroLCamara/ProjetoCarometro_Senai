import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import telaLogin from './pages/telaLogin';
import perfilAluno from './pages/perfilAluno';
import telaADM from './pages/telaADM';
import Listagem from './pages/Listagem/listagem'

import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';

const Routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" component={telaLogin}/>
        <Route path="/PerfilAluno" component={perfilAluno} />
        <Route path="/TelaADM" component={telaADM} />
        <Route path="/Listagem" element={<Listagem />} />
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  Routing, document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
