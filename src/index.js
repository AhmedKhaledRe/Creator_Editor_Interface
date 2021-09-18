import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/state/store";
import reportWebVitals from './reportWebVitals';
import CreateQuiz from "./common/component/CreateQuiz";
import EditQuiz from "./common/component/EditQuiz";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/quiz/create" component={CreateQuiz} />
          <Route exact path="/quiz/edit/:id" component={EditQuiz} />
          <Route path="/" component={App} />
        </Switch>
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
