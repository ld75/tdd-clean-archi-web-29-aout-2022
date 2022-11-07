import {Answer} from "../entities/answer";
import {AnyAction} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState";


export const validateAnswerReducer=(state:{answer:Answer}={answer:{givenAnswer:null,correctAnswer:null}},action:AnyAction):{answer:Answer}=>
{
    if(action.type==="VALIDATE_ANSWER"){
        let questionAnswer:Record<string,string> = action.payload;
        const givenanswer=questionAnswer.givenanswser;
        const correctAnswer=Object.values(questionAnswer.answer)[0];
        return { answer:{givenAnswer:givenanswer,correctAnswer:correctAnswer}}
    }
    return state;
}