import { Question } from "../../../question";

export interface QuestionGateway {
  pickQuestion(): Promise<Question>;
}
