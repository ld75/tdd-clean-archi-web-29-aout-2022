import {QuestionGateway} from "../../../hexagon/gateways/questionGateway";
import {Question} from "../../../hexagon/entities/question";

export class InMemoryQuestionGateway implements QuestionGateway {
    public question: Question | undefined;

    async getNextQuestion(): Promise<Question> {
        // @ts-ignore
        return this.question;
    }
    set addNextQuestion(questionvalue:Question){
         this.question=questionvalue;
    }

    getCorrectAnswer(questionid: string, givenAnswer: string): Promise<Record<string,string>> {
        return Promise.resolve({});
    }
}