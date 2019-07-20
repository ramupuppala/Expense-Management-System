//Action imports
import * as allActions from '../actions/actions.const';

const intialState = {
    budget: 2000000,
    
}

/**
 * Reducers for user operations.
 */
export default function userReducer(state = intialState, action) {
    switch (action.type) {

        case allActions.FETCH_UPDATED_BUDGET:
                return {
                    ...state,
                    budget: action.payload
                }
        case allActions.RECIEVE_UPDATED_BUDGET:
                return {
                    ...state,
                    budget:action.payload
                }
        default:
            return state;
    }
    
}