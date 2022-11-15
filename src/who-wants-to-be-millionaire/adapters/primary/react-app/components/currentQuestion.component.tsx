import { QuestionTitle } from "./questionTitle.component";
import { PossibleAnswers } from "./possibleAnswers.component";
import { QuestionNumber } from "./questionNumber.component";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store/appState";
import {pickQuestionUsecase} from "../../../../hexagon/use-cases/pickQuestionUsecase";
import {AppDispatch} from "../../../../store/reduxStore";
import {toQuestionView} from "../../../../hexagon/selectors/questiondisplay";


export const CurrentQuestion = () => {
    const dispatch= useDispatch<AppDispatch>(); // useDispatch de react-redux permet de recuperer le dispatch de redux
    //const question = useSelector((state:AppState)=>{return state.pickQuestionState.question}); //useSelector select la donnée dans le store. se met automatiquement à jour à chaque changement du store(qui est immutable donc qui a été remplacé par un nouvel etat)
    const question = useSelector((state:AppState)=>{return toQuestionView(state)});
    useEffect(()=>{
        dispatch(pickQuestionUsecase())
    },[])
  return (
      <div>
      {question && ( //question &&: c a d que le div ne s'affiche que si question n'est pas undefined
           <div>
              <QuestionNumber/>
              <QuestionTitle title={question.titre}/>
              <PossibleAnswers possibleAnswers={question.reponses}/>
          </div>
      ) }
    </div>
  );
};
