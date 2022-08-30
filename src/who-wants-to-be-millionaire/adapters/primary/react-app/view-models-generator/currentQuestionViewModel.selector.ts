import { AppState } from "../../../../store/appState";

export const getCurrentQuestionVM = (state: AppState) => {
  const question = state.pickQuestion.question;
  const { rightAnswerId } = state.validateAnswer;
  return {
    id: question?.id,
    title: question?.title,
    possibleAnswers: Object.entries(question!.possibleAnswers).reduce(
      (acc, [letter, label]) => ({
        ...acc,
        [letter]: {
          label,
          status:
            rightAnswerId && letter === rightAnswerId
              ? "HIGHLIGHTED_GOOD"
              : "NOT_HIGHLIGHTED",
        },
      }),
      {}
    ),
  };
};
