import { QuestionGateway } from "../../../hexagon/gateways/questionGateway";
import { Question } from "../../../hexagon/models/question";

export class HttpQuestionGateway implements QuestionGateway {
  async pickQuestion(): Promise<Question> {
    return {
      id: "123abc",
      title: "Que signifie l'acronyme TDD ?",
      possibleAnswers: {
        A: "Test-Driven Development",
        B: "Test-Dodo Development",
        C: "Thunk-Driven Development",
        D: "Test-Driven Design",
      },
    };
  }

  validateAnswer(
    questionId: string,
    answerId: string
  ): Promise<{ givenAnswerId: string; rightAnswerId: string }> {
    return Promise.resolve({ givenAnswerId: "", rightAnswerId: "" });
  }
}
