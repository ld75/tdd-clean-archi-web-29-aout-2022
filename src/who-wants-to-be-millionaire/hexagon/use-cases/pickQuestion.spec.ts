import { AppState } from "../../store/appState";
import {ReduxStore} from "../../store/reduxStore";


describe("Pick the next question", () => {
    let store: ReduxStore;
    beforeEach(() => {
    });

    it("should not have picked any question initially", () => {
        expect(store.getState()).toEqual<AppState>({
            pickQuestion: {
                question: null,
            },
        });
    });

});
