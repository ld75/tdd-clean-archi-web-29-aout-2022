import {Question} from "../hexagon/entities/question";

export interface AppState {

    pickQuestionState: {
        question: Question|null
    }

}