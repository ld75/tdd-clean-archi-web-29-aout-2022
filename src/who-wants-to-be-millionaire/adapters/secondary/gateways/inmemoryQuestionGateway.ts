import {QuestionGateway} from "../../../hexagon/gateways/questionGateway";
import {Question} from "../../../hexagon/entities/question";

export class InMemoryQuestionGateway implements QuestionGateway {
    public question: Question | undefined;

    async getFirstQuestion(): Promise<Question> {
        // @ts-ignore
        return this.question;
    }
    set nextQuestion(questionvalue:Question){
         this.question=questionvalue;
    }
}