import { QuestionGateway } from "../../../hexagon/gateways/questionGateway";
import { Question } from "../../../hexagon/models/question";

export class InMemoryQuestionGateway implements QuestionGateway {
  private _nextQuestions: Question[] = [];
  private _answerValidation: {
    rightAnswerId: string | null;
  } = { rightAnswerId: null };
  private currentQuestionNumber: number = 0;

  async pickQuestion(): Promise<Question> {
    const question = this._nextQuestions[0];
    this.currentQuestionNumber++;
    return question;
  }

  async validateAnswer(
    questionId: string,
    answerId: string
  ): Promise<{ givenAnswerId: string; rightAnswerId: string }> {
    if (questionId !== this._nextQuestions[0]?.id)
      throw new Error("Not the right question passed");
    return {
      givenAnswerId: answerId,
      rightAnswerId: this._answerValidation.rightAnswerId!,
    };
  }

  set nextQuestions(questions: Question[]) {
    this._nextQuestions = questions;
  }

  set answerValidation(value: { rightAnswerId: string | null }) {
    this._answerValidation = value;
  }
}
