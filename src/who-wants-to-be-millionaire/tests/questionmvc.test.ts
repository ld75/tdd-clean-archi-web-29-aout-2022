import {Question} from "../hexagon/entities/question";
import {AppState} from "../store/appState";
import {Answer} from "../hexagon/entities/answer";
import {initReduxStore, ReduxStore} from "../store/reduxStore";
import {toQuestionView} from "../hexagon/selectors/questiondisplay";
import exp from "constants";
let initialstate:AppState
let store:ReduxStore;
beforeEach(()=>{
    store = initReduxStore({})
    initialstate=store.getState()
})

describe("mappingpvc test",()=>{
    it('should mvc question with wrong answer', ()=> {
        store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{
            id: "a",
                demande: "question 1",
                possibleAnswers: {a: "machintruc", b: "chose", c: "truc"}
        }}})
        store.dispatch({type:'VALIDATE_ANSWER',payload:{questionIdCorrectAnswer:{"a":"c"},givenanswser:"b"}})
        console.log(store.getState())
        let storequestion = toQuestionView(store.getState())
        expect(storequestion).toEqual({
                titre: "question 1",
                reponses: {
                    a: {
                        titre: "machintruc",
                        statut: "neutre"
                    },
                    b: {
                        titre: "chose",
                        statut: "faux"
                    },
                        c: {
                            titre: "truc",
                            statut: "correct"
                        }
                    }
        });
    })
    it('no_question questionmvc return null',()=>{
        let res = toQuestionView(store.getState())
        expect(res).toEqual(null)
    })
   it('should mvc question with good answer', ()=> {
            store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{
                        id: "a",
                        demande: "question 1",
                        possibleAnswers: {a: "machintruc", b: "chose", c: "truc"}
                    }}})
            store.dispatch({type:'VALIDATE_ANSWER',payload:{questionIdCorrectAnswer:{"a":"b"},givenanswser:"b"}})
            console.log(store.getState())
            let storequestion = toQuestionView(store.getState())
            expect(storequestion).toEqual({
                    titre: "question 1",
                    reponses: {
                        a: {
                            titre: "machintruc",
                            statut: "neutre"
                        },
                        b: {
                            titre: "chose",
                            statut: "correct"
                        },
                        c: {
                            titre: "truc",
                            statut: "neutre"
                        }
                    }
            });
        })
}
)



