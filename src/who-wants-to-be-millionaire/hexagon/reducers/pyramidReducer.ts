import {Answer} from "../entities/answer";
import {AnyAction} from "@reduxjs/toolkit";
import {Pyramid} from "../entities/pyramid";

export const pyramidReducer=(state:{pyramid:Pyramid}={pyramid:{valeur:0}},action:AnyAction):{pyramid:Pyramid}=>
{
    if (action.type=='INCREASE_PYRAMID') {
        return action.payload
    }
    return state;
}