import { AppState } from "../../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../../store/reduxStore";
import {pickQuestionUsecase} from "./pickQuestionUsecase";
import {QuestionGateway} from "../gateways/questionGateway";
import {InMemoryQuestionGateway} from "./tests/inmemoryQuestionGateway"


describe("Pick the next question", () => {
    let store: ReduxStore;
    let questionGatewayInstance:InMemoryQuestionGateway
    beforeEach(() => {
        questionGatewayInstance = new InMemoryQuestionGateway()
        store = initReduxStore({questionGatewayInstance})
    });

    it("should not have picked any question initially", () => {
        //store.dispatch(({state:{pickQuestion:{question:null}}={pickQuestion:{question:null}},action:AnyAction})=> state)
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: null,
            },
        });
    });
    it('should pick question the from server returned question', async function () {
        questionGatewayInstance.nextQuestion={id:"hello"}
        await store.dispatch(pickQuestionUsecase())
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: {
                    id: "hello"
                },
            },
        })
    });

});
