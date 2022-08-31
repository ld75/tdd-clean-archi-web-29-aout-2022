import { AppState } from "../../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../../store/reduxStore";


describe("Pick the next question", () => {
    let store: ReduxStore;

    beforeEach(() => {
        store = initReduxStore({})
    });

    it("should not have picked any question initially", () => {
        //store.dispatch(({state:{pickQuestion:{question:null}}={pickQuestion:{question:null}},action:AnyAction})=> state)
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: {
                    id:null
                },
            },
        });
    });
    it('should pick the from server returned question', function () {
            store.dispatch({type:'PICK_RETURNED_QUESTION',payload:{nbr:"1"}})
        expect(store.getState()).toEqual<AppState>({
            pickQuestionState: {
                question: {
                    id: "hello"
                },
            },
        })
    });

});
