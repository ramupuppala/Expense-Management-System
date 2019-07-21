//Action imports
import * as allActions from '../actions/actions.const';

const intialState = {
    categories: [],
    category:[]
    
}

/**
 * Reducers for user operations.
 */
export default function userReducer(state = intialState, action) {
   
    switch (action.type) {
        case allActions.FETCH_CATEGORIES:
            return action;
        case allActions.RECIEVE_CATEGORIES:
            console.log(action.payload)
            return {
                ...state,
                categories: action.payload
            }
        case allActions.FETCH_CATEGORIES_BY_ID:
            return {
                action
            }
        case allActions.RECIEVE_CATEGORIES_BY_ID:
            return {
                ...state,
                category: action.payload
            }
        case allActions.FETCH_EDIT_CATEGORY:
            return {
                action
            }
        case allActions.RECIEVE_EDIT_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        case allActions.FETCH_CREATE_CATEGORY:
            return {
                action
            }
        case allActions.RECIEVE_CREATE_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        case allActions.FETCH_DELETE_CATEGORY:
            return {
                action
            }
        case allActions.RECIEVE_DELETE_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}