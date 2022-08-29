import { Question } from "../../question";

export interface AppState {
  pickQuestion: {
    question: Question | null;
  };
}
