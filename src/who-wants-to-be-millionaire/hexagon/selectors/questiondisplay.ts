import {AppState} from "../../store/appState";
import {Answer} from "../entities/answer";

export interface QuestionView{
    question: {
        titre: string,
        reponses: Record<string, {
            title:string,
            statut:string
        }>
    }
}
export function toQuestionView(state:AppState) {
    if (state.pickQuestionState.question==null) return null;
    let answers = state.pickQuestionState.question!.possibleAnswers;

    function getstatut(thisAnsId: string, {givenAnswer,correctAnswer}: Answer) {
        let ret:string="neutre";
        if (thisAnsId!=correctAnswer && thisAnsId==givenAnswer) ret="faux"
        else if(thisAnsId==correctAnswer) ret="correct"
        return ret;
    }
    let answersmvc = Object.entries(answers).reduce((carry,[identifiant,titre])=>{
        return {
            ...carry,
            [identifiant]: {
                statut: getstatut(identifiant,state.validateAnswerState.answer),
                titre: titre
            }}
    },{})
    return {
        titre: state.pickQuestionState.question.demande,
                reponses: answersmvc

    }
}