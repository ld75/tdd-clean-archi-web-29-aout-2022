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
import {validateAnswerReducer as validateAnswerState} from "../hexagon/reducers/validateAnswerReducer";
import {pyramidReducer as pyramidState} from "../hexagon/reducers/pyramidReducer";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import {QuestionGateway} from "../hexagon/gateways/questionGateway";
import {Question} from "../hexagon/entities/question";
import {ITimer} from "../hexagon/gateways/iTimer";



export interface Dependencies {
    questionGatewayInstance:QuestionGateway,
    timer:ITimer
}
//code fourni par redux:
export const initReduxStore = (dependencies: Partial<Dependencies>) => { //Partial pour dire que on est pas obligé d'avoir des dépendances: ce param peut etre vide
    return configureStore({
        reducer: {
            pickQuestionState,
            validateAnswerState,
            pyramidState
        },
        devTools: true, // pour dire qu'on peut utiliser le plugin redux du devtool dans le browser
        middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<AppState>) =>
            getDefaultMiddleware({
                thunk: { // un des plugin(=proxy) qui ici est thunk. On peut en ajouter d 'autres qui existent
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
