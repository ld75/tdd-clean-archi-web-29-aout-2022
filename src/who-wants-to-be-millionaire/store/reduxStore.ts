import {
  Action,
  AnyAction,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppState } from "./appState";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { pickQuestionReducer as pickQuestion } from "../hexagon/reducers/pickQuestion.reducer";
import { QuestionGateway } from "../hexagon/gateways/questionGateway";
import { validateAnswerReducer as validateAnswer } from "../hexagon/reducers/validateAnswer.reducer";
import { pyramidReducer as pyramid } from "../hexagon/reducers/pyramid.reducer";
import { TaskWaiter } from "../hexagon/gateways/taskWaiter";

export interface Dependencies {
  questionGateway: QuestionGateway;
  taskWaiter: TaskWaiter;
}

export const initReduxStore = (dependencies: Partial<Dependencies>) => {
  return configureStore({
    reducer: {
      pickQuestion,
      validateAnswer,
      pyramid,
    },
    devTools: true,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<AppState>) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });
};

export type ReduxStore = Store<AppState> & {
  dispatch: ThunkDispatch<AppState, Dependencies, Action>;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  Dependencies,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>;
