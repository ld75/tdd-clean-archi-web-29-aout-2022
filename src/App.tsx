import React from "react";
import "./App.css";
import { CurrentQuestion } from "./who-wants-to-be-millionaire/currentQuestion.component";
import { Pyramid } from "./who-wants-to-be-millionaire/pyramid.component";
import { Jokers } from "./who-wants-to-be-millionaire/jokers.component";

export function App() {
  return (
    <div className="App">
      <div className="flex justify-between mx-3">
        <div className="flex flex-col w-6/12">
          <CurrentQuestion />
        </div>
        <div className="flex flex-col w-3/12">
          <Jokers />
          <Pyramid />
        </div>
      </div>
    </div>
  );
}
