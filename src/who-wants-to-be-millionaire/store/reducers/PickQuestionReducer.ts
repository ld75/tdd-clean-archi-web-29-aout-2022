import {Action} from "@reduxjs/toolkit";
import {pickQuestionUsecase} from "../../hexagon/use-cases/pickQuestionUsecase"
export const pickQuestionReducer=(state:{question:{id:null}}={question:{id:null}},action:Action)=>
{
    action.payload
    if(action.type==="PICK_RETURNED_QUESTION") return pickQuestionUsecase();//{question:{id:"hello"}}
    return state
}


