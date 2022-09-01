import {Question} from "../entities/question"
export interface QuestionGateway {
    getFirstQuestion():Promise<Question> // {id:"hello"}

}