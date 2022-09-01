import { AppState } from "../../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../../store/reduxStore";
import {pickQuestionUsecase} from "./pickQuestionUsecase";
import {QuestionGateway} from "../gateways/questionGateway";
import {InMemoryQuestionGateway} from "./tests/inmemoryQuestionGateway"


describe("Pick the next question", () => {
    let store: ReduxStore;
    let inMemoryQuestionGateway:InMemoryQuestionGateway
    beforeEach(() => {
        store = initReduxStore({})
        inMemoryQuestionGateway = new InMemoryQuestionGateway()
    });

    it("should not have picked any question initially", () => {
        //store.dispatch(({state:{pickQuestion:{question:null}}={pickQuestion:{question:null}},action:AnyAction})=> state)
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: null,
            },
        });
    });
    it('should pick the from server returned question', async function () {
        inMemoryQuestionGateway.nextQuestion={id:"hello"}
        await pickQuestionUsecase(store.dispatch, inMemoryQuestionGateway);
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: {
                    id: "hello"
                },
            },
        })
    });

});
