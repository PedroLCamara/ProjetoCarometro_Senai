import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from './pages/telaLogin/telaLogin';
import perfilAluno from './pages/perfilAluno/perfilAluno';
import telaADM from './pages/telaADM/telaADM';
import TesteCadastro from './pages/testeCadastro/testeCadastro';

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

const Routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        {/* <Route path="/PerfilAluno" element={<perfilAluno/>} />
        <Route path="/TelaADM" element={<telaADM/>} /> */}
        <Route path="/TesteCadastro" element={<TesteCadastro/>} />
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
