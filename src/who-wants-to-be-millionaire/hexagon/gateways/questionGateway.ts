import { Question } from "../models/question";

export interface QuestionGateway {
  pickQuestion(): Promise<Question>;

  validateAnswer(
    questionId: string,
    answerId: string
  ): Promise<{
    givenAnswerId: string;
    rightAnswerId: string;
  }>;
}
