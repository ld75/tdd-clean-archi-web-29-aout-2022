import {Question} from "../hexagon/entities/question";
import {Answer} from "../hexagon/entities/answer";



export interface AppState {
    pickQuestionState: {
        question: Question|null
    },
    validateAnswerState:{
        answer:Answer
    }

}