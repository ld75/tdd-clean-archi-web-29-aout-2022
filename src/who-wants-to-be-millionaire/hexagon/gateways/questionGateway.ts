import {Question} from "../entities/question"
export interface QuestionGateway {
    getNextQuestion():Promise<Question> // {id:"hello"}
    getCorrectAnswer(questionid:string,givenAnswer: string): Promise<Record<string,string>>;

}