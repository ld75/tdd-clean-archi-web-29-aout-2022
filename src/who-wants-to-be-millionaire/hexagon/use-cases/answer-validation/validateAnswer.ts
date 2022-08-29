import { AppThunk, Dependencies } from "../../../store/reduxStore";

export const validateAnswer =
  (questionId: string, answerId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState, { questionGateway }: Dependencies) => {
    const { givenAnswerId, rightAnswerId } =
      await questionGateway.validateAnswer(questionId, answerId);
    dispatch({
      type: "VALIDATED_ANSWER",
      payload: {
        givenAnswerId,
        rightAnswerId,
      },
    });
  };
