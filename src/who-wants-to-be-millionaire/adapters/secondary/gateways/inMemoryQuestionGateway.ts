import { QuestionGateway } from "../../../hexagon/gateways/questionGateway";
import { Question } from "../../../../question";

export class InMemoryQuestionGateway implements QuestionGateway {
  private _nextQuestion: Question | null = null;

  async pickQuestion(): Promise<Question> {
    return this._nextQuestion as any;
  }

  set nextQuestion(value: Question | null) {
    this._nextQuestion = value;
  }
}
