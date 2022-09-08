import {
    Action,
    AnyAction,
    configureStore,
    Store,
    ThunkAction,
    ThunkDispatch,
} from "@reduxjs/toolkit";
import { AppState } from "./appState";
import {pickQuestionReducer as pickQuestionState} from "../hexagon/reducers/pickQuestionReducer";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import {QuestionGateway} from "../hexagon/gateways/questionGateway";

export interface Dependencies {
    questionGatewayInstance:QuestionGateway;
}

export const initReduxStore = (dependencies: Partial<Dependencies>) => {
    return configureStore({
        reducer: {
            pickQuestionState
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
