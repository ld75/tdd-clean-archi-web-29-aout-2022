import { QuestionTitle } from "./questionTitle.component";
import { PossibleAnswers } from "./possibleAnswers.component";
import { QuestionNumber } from "./questionNumber.component";
import { useEffect } from "react";
import { pickQuestion } from "../../../../hexagon/use-cases/question-picker/pickQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/reduxStore";
import { AppState } from "../../../../store/appState";

export const CurrentQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector(
    (state: AppState) => state.pickQuestion.question
  );

  useEffect(() => {
    dispatch(pickQuestion());
  }, [dispatch]);

  return (
    <div>
      {question && (
        <div>
          <QuestionNumber />
          <QuestionTitle title={question.title} />
          <PossibleAnswers possibleAnswers={question.possibleAnswers} />
        </div>
      )}
    </div>
  );
};
