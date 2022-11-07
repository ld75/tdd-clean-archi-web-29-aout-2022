import {AnyAction} from "@reduxjs/toolkit";
import {Question} from "../entities/question";
import {AppState} from "../../store/appState";

export const pickQuestionReducer=(state:{question:Question|null}={question:null},action:AnyAction):{question:Question|null}=>
{
//    if(action.type==="PICK_RETURNED_QUESTION") return pickQuestionUsecase();//{question:{id:"hello"}}
    if(action.type==="PICK_RETURNED_QUESTION") return action.payload
    return state
}


