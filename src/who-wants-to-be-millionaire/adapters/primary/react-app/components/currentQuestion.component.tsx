import { QuestionTitle } from "./questionTitle.component";
import { PossibleAnswers } from "./possibleAnswers.component";
import { QuestionNumber } from "./questionNumber.component";
import { useEffect } from "react";
import { pickQuestion } from "../../../../hexagon/use-cases/question-picker/pickQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/reduxStore";
import { getCurrentQuestionVM } from "../view-models-generator/currentQuestionViewModel.selector";

export const CurrentQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector(getCurrentQuestionVM);

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
