import {AppThunk, Dependencies} from "../../store/reduxStore";
import {AppState} from "../../store/appState";

export const validateAnswerUsecase=
    (givenAnswer:string):AppThunk<Promise<void>>=>async (dispatch,getState, {questionGatewayInstance}:Dependencies)=>{
    let question = getState().pickQuestionState.question;
    console.log(question)
    if (question==null) throw Error();
    const questionAnsweredId:string=question.id
        const questionIdAndGoodAnswser:Record<string,string> = await questionGatewayInstance.getCorrectAnswer(questionAnsweredId,givenAnswer)
        console.log(questionIdAndGoodAnswser)
        if (questionIdAndGoodAnswser[questionAnsweredId]==null) throw Error();
        dispatch({type:'VALIDATE_ANSWER',payload:{answer:questionIdAndGoodAnswser,givenanswser:givenAnswer}})
    }

