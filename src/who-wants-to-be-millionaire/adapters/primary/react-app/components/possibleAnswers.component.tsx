import React, { FC, useEffect } from "react";
import { Question } from "../../../../hexagon/models/question";
import { validateAnswer } from "../../../../hexagon/use-cases/answer-validation/validateAnswer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/reduxStore";
import { AppState } from "../../../../store/appState";

interface Props {
  possibleAnswers: Question["possibleAnswers"];
}

export const PossibleAnswers: FC<Props> = ({ possibleAnswers }) => {
  const dispatch = useDispatch<AppDispatch>();
  const validatedAnswer = useSelector((state: AppState) => {
    return state.validateAnswer;
  });

  const _validateAnswer = (answerId: string) => () => {
    dispatch(validateAnswer(answerId));
  };

  useEffect(() => {
    if (validatedAnswer.rightAnswerId) alert(JSON.stringify(validatedAnswer));
  }, [validatedAnswer]);

  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(possibleAnswers).map(([answerId, answerLabel]) => {
        return (
          <div
            className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900"
            onClick={_validateAnswer(answerId)}
          >
            <span className="text-orange-500">{answerId}:</span> {answerLabel}
          </div>
        );
      })}
    </div>
  );
};
