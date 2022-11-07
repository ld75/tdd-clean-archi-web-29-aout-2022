import {QuestionGateway} from "../../../hexagon/gateways/questionGateway";
import {Question} from "../../../hexagon/entities/question";

export class HttpQuestionGateway implements QuestionGateway {


    getFirstQuestion(): Promise<Question> {
        const valeur:string=process.env.REACT_APP_UNTRUC+""
        return Promise.resolve({id:"question",demande:"demande",possibleAnswers:{"a":valeur,"b":"moncul","c":"tata"}});
    }

    async getCorrectAnswer(questionid: string, givenAnswer: string): Promise<Record<string,string>> {
        return {}; // implicitement à cause du type retourné et de async ça retoune Promise.resolve("")
    }
}