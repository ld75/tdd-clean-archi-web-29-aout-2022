import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import { initReduxStore } from "./who-wants-to-be-millionaire/store/reduxStore";
import { Provider } from "react-redux";
import { InMemoryQuestionGateway } from "./who-wants-to-be-millionaire/adapters/secondary/gateways/inMemoryQuestionGateway";
import { HttpQuestionGateway } from "./who-wants-to-be-millionaire/adapters/secondary/gateways/httpQuestionGateway";
import { QuestionGateway } from "./who-wants-to-be-millionaire/hexagon/gateways/questionGateway";

let questionGateway: QuestionGateway;

if (process.env.REACT_APP_INMEMORY === "true") {
  questionGateway = new InMemoryQuestionGateway();
  (questionGateway as InMemoryQuestionGateway).nextQuestion = {
    id: "123abc",
    title: "Quel est le meilleur framework Web ?",
    possibleAnswers: {
      A: "Angular",
      B: "React",
      C: "Vue",
      D: "Svelte",
    },
  };
  (questionGateway as InMemoryQuestionGateway).answerValidation = {
    rightAnswerId: "B",
  };
} else questionGateway = new HttpQuestionGateway();

const store = initReduxStore({ questionGateway });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
