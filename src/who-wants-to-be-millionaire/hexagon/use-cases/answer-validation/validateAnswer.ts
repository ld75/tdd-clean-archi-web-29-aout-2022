import { AppThunk, Dependencies } from "../../../store/reduxStore";
import { pickQuestion } from "../question-picker/pickQuestion";

export const validateAnswer =
  (answerId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState, { questionGateway }: Dependencies) => {
    const { givenAnswerId, rightAnswerId } =
      await questionGateway.validateAnswer(
        getState().pickQuestion.question!.id,
        answerId
      );
    dispatch({
      type: "VALIDATED_ANSWER",
      payload: {
        givenAnswerId,
        rightAnswerId,
      },
    });
    await dispatch(pickQuestion());
  };
