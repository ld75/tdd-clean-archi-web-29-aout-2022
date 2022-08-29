import { QuestionGateway } from "../../../hexagon/gateways/questionGateway";
import { Question } from "../../../../question";

export class InMemoryQuestionGateway implements QuestionGateway {
  private _nextQuestion: Question | null = null;
  private _answerValidation: {
    givenAnswerId: string | null;
    rightAnswerId: string | null;
  } = { givenAnswerId: null, rightAnswerId: null };

  async pickQuestion(): Promise<Question> {
    return this._nextQuestion as any;
  }

  async validateAnswer(
    questionId: string,
    answerId: string
  ): Promise<{ givenAnswerId: string; rightAnswerId: string }> {
    if (questionId !== this._nextQuestion?.id)
      throw new Error("Not the right question passed");
    return {
      givenAnswerId: this._answerValidation.givenAnswerId!,
      rightAnswerId: this._answerValidation.rightAnswerId!,
    };
  }

  set nextQuestion(value: Question | null) {
    this._nextQuestion = value;
  }

  set answerValidation(value: {
    givenAnswerId: string | null;
    rightAnswerId: string | null;
  }) {
    this._answerValidation = value;
  }
}
