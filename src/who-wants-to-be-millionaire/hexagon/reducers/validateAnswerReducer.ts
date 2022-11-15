import {Answer} from "../entities/answer";
import {AnyAction} from "@reduxjs/toolkit";
import {AppState} from "../../store/appState";


interface QuestionIdAndGoogAnswer {
answer:Record<string,string>
}

export const validateAnswerReducer=(state:{answer:Answer}={answer:{givenAnswer:null,correctAnswer:null}},action:{type:string,payload:{questionIdCorrectAnswer: QuestionIdAndGoogAnswer,givenanswser:string}}):{answer:Answer}=>
{
    if(action.type==="VALIDATE_ANSWER"){
        const givenAnswer=action.payload.givenanswser;
        const correctAnswer=Object.values(action.payload.questionIdCorrectAnswer)[0];
        return { answer:{givenAnswer:givenAnswer,correctAnswer:correctAnswer}}
    }
    if(action.type==="PICK_RETURNED_QUESTION") return { answer:{givenAnswer:null,correctAnswer:null}}
    return state;
}