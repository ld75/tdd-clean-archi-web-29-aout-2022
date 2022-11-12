import {AppThunk, Dependencies} from "../../store/reduxStore";
import {AppState} from "../../store/appState";
import {pickQuestionUsecase} from "./pickQuestionUsecase";
import {TimerMock} from "../../tests/mocks/timerMock";

export const validateAnswerUsecase=
    (givenAnswer:string):AppThunk<Promise<void>>=>async (dispatch,getState, {questionGatewayInstance,timer}:Dependencies)=>{
    let question = getState().pickQuestionState.question;
    if (question==null) throw Error();
    const questionAnsweredId:string=question.id
        const questionIdAndGoodAnswser:Record<string,string> = await questionGatewayInstance.getCorrectAnswer(questionAnsweredId,givenAnswer)
        if (questionIdAndGoodAnswser[questionAnsweredId]==null) throw Error();
        dispatch({type:'VALIDATE_ANSWER',payload:{answer:questionIdAndGoodAnswser,givenanswser:givenAnswer}})
        if (givenAnswer==questionIdAndGoodAnswser[questionAnsweredId]){
            dispatch({type:'INCREASE_PYRAMID',payload:{pyramid:{valeur:getState().pyramidState.pyramid.valeur+1}}})
            timer.setTimeout(()=>{
                dispatch(pickQuestionUsecase())
            },3000)

        }
    }

