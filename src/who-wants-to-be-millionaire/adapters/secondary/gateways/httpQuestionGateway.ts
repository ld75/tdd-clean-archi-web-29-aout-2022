import {QuestionGateway} from "../../../hexagon/gateways/questionGateway";
import {Question} from "../../../hexagon/entities/question";

export class HttpQuestionGateway implements QuestionGateway {
    nbrquestion:number=0;
    getNextQuestion(): Promise<Question> {
        const valeur:string=process.env.REACT_APP_UNTRUC+""
        this.nbrquestion++;
        if (this.nbrquestion<3)return Promise.resolve({id:"question",demande:"demande",possibleAnswers:{"a":valeur,"b":"moncul","c":"tata"}});
        else  return Promise.resolve({id:"2",demande:"deuxiemequestion",possibleAnswers:{"a":"toto","b":"titi"}});

    }

    async getCorrectAnswer(questionid: string, givenAnswer: string): Promise<Record<string,string>> {
        console.log("putain",questionid,givenAnswer)
        let ret:Record<string,string>={};
        ret[questionid]="b"; // implicitement à cause du type retourné et de async ça retoune Promise.resolve("")
        return ret;
    }
}