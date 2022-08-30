import { AppThunk, Dependencies } from "../../../store/reduxStore";
import { pickQuestion } from "../question-picker/pickQuestion";

export const validateAnswer =
  (answerId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState, { questionGateway, taskWaiter }: Dependencies) => {
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
    /*await taskWaiter.waitFor(3000, async () => {
      await dispatch(pickQuestion());
    });*/
  };
