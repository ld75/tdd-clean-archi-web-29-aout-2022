import React, {FunctionComponent, useEffect} from "react";
import {Question} from "../../../../hexagon/entities/question";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store/reduxStore";
import {validateAnswerUsecase} from "../../../../hexagon/use-cases/validateAnswerUsecase";
import {AppState} from "../../../../store/appState";
import classNames from "classnames";
interface Props {
  possibleAnswers: Question["possibleAnswers"];
}

export const PossibleAnswers: FunctionComponent<Props> = ({ possibleAnswers }) => {
  const dispatch= useDispatch<AppDispatch>();
  const validAnswer = useSelector((state:AppState)=>{return state.validateAnswerState.answer});
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(possibleAnswers).map(([key,label])=>{
        return <div>
                    <div onClick={()=>{dispatch(validateAnswerUsecase(key))}}>
                      <span className={classNames({"red":key===validAnswer.givenAnswer},{"green":key===validAnswer.correctAnswer})}><b>{key}</b> :</span><span>{label}</span><span></span>
                    </div>
                </div>
            })}
      <span>ta reponse: {validAnswer.givenAnswer}</span>
    </div>
  );
};
