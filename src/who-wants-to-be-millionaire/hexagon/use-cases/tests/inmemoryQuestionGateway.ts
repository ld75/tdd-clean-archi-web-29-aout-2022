import {QuestionGateway} from "../../gateways/questionGateway";
import {Question} from "../../entities/question";

export class InMemoryQuestionGateway implements QuestionGateway {
    public question:QUestion;
     async getFirstQuestion(): Promise<Question> {
        return this.question;
    }
    set nextQuestion(question:Question){
         this.question=question;
    }
}