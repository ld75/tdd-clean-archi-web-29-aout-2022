import { AppState } from "../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../store/reduxStore";
import {pickQuestionUsecase} from "../hexagon/use-cases/pickQuestionUsecase";
import {QuestionGateway} from "../hexagon/gateways/questionGateway";
import {InMemoryQuestionGateway} from "../adapters/secondary/gateways/inmemoryQuestionGateway"


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
        questionGatewayInstance.nextQuestion={id:"5",demande:"de quelle couleur est le cheval blanc d'Henry IV ?",possibleAnswers:{
                A:"bleu",
                B:"vert",
                C:"gris",
                D:"blanc"}}
        await store.dispatch(pickQuestionUsecase())
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: {
                    id: "5",
                    demande:"de quelle couleur est le cheval blanc d'Henry IV ?",
                    possibleAnswers:{
                        A:"bleu",
                        B:"vert",
                        C:"gris",
                        D:"blanc"}
                },
            },
        })
    });

});
