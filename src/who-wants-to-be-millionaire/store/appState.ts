import {Question} from "../hexagon/entities/question";
import {Answer} from "../hexagon/entities/answer";
import {Pyramid} from "../hexagon/entities/pyramid";



export interface AppState {
    pickQuestionState: {
        question: Question|null
    },
    validateAnswerState:{
        answer:Answer
    },
    pyramidState:{
        pyramid:Pyramid
    }

}