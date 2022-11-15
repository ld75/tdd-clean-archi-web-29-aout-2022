import React, {FunctionComponent, useEffect} from "react";
import {Question} from "../../../../hexagon/entities/question";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store/reduxStore";
import {validateAnswerUsecase} from "../../../../hexagon/use-cases/validateAnswerUsecase";
import {AppState} from "../../../../store/appState";
import classNames from "classnames";
interface Props {
  possibleAnswers: Record<string, {
    titre:string,
  statut:string
}>
}

const couleurs={
  "correct":"green",
  "faux":"red",
  "neutre":"grey"
}

export const PossibleAnswers: FunctionComponent<Props> = ({ possibleAnswers }) => {

  const dispatch= useDispatch<AppDispatch>();
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(possibleAnswers).map(([key,reponsetitleAndStatut])=>{
        return <div>
                    <div onClick={()=>{dispatch(validateAnswerUsecase(key))}}>
                      <span className={classNames(couleurs[reponsetitleAndStatut.statut as keyof typeof couleurs])}><b>{key}</b> :</span><span>{reponsetitleAndStatut.titre}</span>
                    </div>
                </div>
            })}
    </div>
  );
};
