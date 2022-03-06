import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from './pages/telaLogin/telaLogin';
import PerfilAluno from './pages/perfilAluno/perfilAluno';
import Listagem from './pages/listagem/listagem';

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
        <Route path="/perfilAluno/:idAluno" element={<PerfilAluno/>}/>
        <Route path="/Listagem" element={<Listagem/>}/>
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
