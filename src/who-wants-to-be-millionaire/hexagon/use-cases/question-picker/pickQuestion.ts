import { AppThunk, Dependencies } from "../../../store/reduxStore";

export const pickQuestion =
  (): AppThunk<Promise<void>> =>
  async (dispatch, getState, { questionGateway }: Dependencies) => {
    const question = await questionGateway.pickQuestion();
    dispatch({
      type: "PICKED_QUESTION",
      payload: {
        question,
      },
    });
  };
