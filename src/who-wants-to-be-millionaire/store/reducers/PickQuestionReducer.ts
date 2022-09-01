import {Action} from "@reduxjs/toolkit";
import {Question} from "../../hexagon/entities/question";
export const pickQuestionReducer=(state:{question:Question|null}={question:null},action:AnyAction)=>
{
//    if(action.type==="PICK_RETURNED_QUESTION") return pickQuestionUsecase();//{question:{id:"hello"}}
    if(action.type==="PICK_RETURNED_QUESTION") return action.payload
    return state
}


