import {Question} from "../hexagon/entities/question";

export {}
import {AppState} from "../store/appState";
import {Answer} from "../hexagon/entities/answer";
import {initReduxStore, ReduxStore} from "../store/reduxStore";
let initialstate:AppState
let store:ReduxStore;
beforeEach(()=>{
    store = initReduxStore({})
    initialstate=store.getState()
})

describe("lmkqsjdflmkj",()=>{
    it('should mvc question', ()=> {
        store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{
            id: "a",
                demande: "salut poilu?",
                possibleAnswers: {a: "machintruc", b: "chose", c: "truc"}
        }}})
        store.dispatch({type:'VALIDATE_ANSWER',payload:{questionIdCorrectAnswer:{"a":"c"},givenanswser:"b"}})
        /*let etatinitial = {
            ...initialstate,
            pickQuestionState: {
                question: {
                    id: "a",
                    demande: "salut poilu?",
                    possibleAnswers: {a: "machintruc", b: "chose", c: "truc"}
                }
            },
            validateAnswerState: {
                answer: {
                    givenAnswer: "b",
                    correctAnswer: "c"
                }
            }
        };*/
        console.log(store.getState())
        let storequestion = convertToMvc(store.getState())
        expect(storequestion).toEqual({
            question: {
                titre: "salut poilu?",
                reponses: {
                    a: {
                        titre: "machintruc",
                        statut: "neutre"
                    },
                    b: {
                        titre: "chose",
                        statut: "rouge"
                    },
                        c: {
                            titre: "truc",
                            statut: "vert"
                        }
                    }
                }
        });
    })})
    function convertToMvc(state:AppState) {
         let answers = state.pickQuestionState.question!.possibleAnswers;

        function getstatut(thisAnsId: string, {givenAnswer,correctAnswer}: Answer) {
            console.log(givenAnswer)
            let ret:string="neutre";
            if (thisAnsId!=correctAnswer && thisAnsId==givenAnswer) ret="rouge"
            else if(thisAnsId==correctAnswer) ret="vert"
            console.log(ret)
            return ret;
        }
        let answersmvc = Object.entries(answers).reduce((carry,[identifiant,titre])=>{
            return {
                ...carry,
                [identifiant]: {
                    statut: getstatut(identifiant,state.validateAnswerState.answer),
                    titre: titre
                }}
        },{})
            return {
            question:
                {titre: "salut poilu?",
                reponses: answersmvc
                }
            }
    }


