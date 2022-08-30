import { Question } from "../hexagon/models/question";

export interface AppState {
  pickQuestion: {
    question: Question | null;
  };
  validateAnswer: {
    givenAnswerId: string | null;
    rightAnswerId: string | null;
  };
}
