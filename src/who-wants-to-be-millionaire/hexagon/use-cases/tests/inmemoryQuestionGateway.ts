import {QuestionGateway} from "../../gateways/questionGateway";
import {Question} from "../../entities/question";

export class InMemoryQuestionGateway implements QuestionGateway {
    public question:Question;
     async getFirstQuestion(): Promise<Question> {
        return this.question;
    }
    set nextQuestion(questionvalue:Question){
         this.question=questionvalue;
    }
}