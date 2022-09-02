import {ReduxStore} from "../../store/reduxStore";
import {ThunkDispatch} from "@reduxjs/toolkit"
import {QuestionGateway} from "../gateways/questionGateway"
import {Question} from "../entities/question";
import {AppThunk} from "../../store/reduxStore";

export const pickQuestionUsecase=
    ():AppThunk<Promise<void>>=>async (dispatch,getState,dependencies)=>{
    const question:Question = await dependencies.questionGatewayInstance.getFirstQuestion()
    dispatch({type:"PICK_RETURNED_QUESTION",payload:{question}})
    }
