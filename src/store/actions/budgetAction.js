//Actions imports
import * as allActions from './actions.const';

export function updateUserBudget(data){
    console.log(data)
    return {
        type:allActions.FETCH_UPDATED_BUDGET,
        payload:data
    }
}
export function receiveUserBudget(){
    return {
        type:allActions.RECIEVE_UPDATED_BUDGET,
        payload:{}
    }
}