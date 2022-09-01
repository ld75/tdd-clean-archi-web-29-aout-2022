import {ReduxStore} from "../../store/reduxStore";
import {ThunkDispatch} from "@reduxjs/toolkit"
import {QuestionGateway} from "../gateways/questionGateway"
import {Question} from "../entities/question";
export const pickQuestionUsecase= async (dispatch:ReduxStore["dispatch"],questionGateway:QuestionGateway)=>{
     const question:Question = await questionGateway.getFirstQuestion()
        dispatch({type:"PICK_RETURNED_QUESTION",payload:{question}})


//return    {question:{id:"hello"}}
}