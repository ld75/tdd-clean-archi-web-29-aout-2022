import {Answer} from "../entities/answer";
import {AnyAction} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState";


interface QuestionIdAndGoodAnswer {
answer:Record<string,string>
}

export const validateAnswerReducer=(state:{answer:Answer}={answer:{givenAnswer:null,correctAnswer:null}},action:AnyAction):{answer:Answer}=>
{
    if(action.type==="VALIDATE_ANSWER"){
        let correctans = Object.values(action.payload.questionIdCorrectAnswer)[0];
        return { answer:{givenAnswer:action.payload.givenanswser,correctAnswer: correctans}}
    }
    if(action.type==="PICK_RETURNED_QUESTION") return { answer:{givenAnswer:null,correctAnswer:null}}
    return state;
}