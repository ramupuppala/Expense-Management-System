//Actions imports
import * as allActions from './actions.const';

/**
 * Action function for getting categories Details
 */
export function fetchCategories(){
    return {
        type:allActions.FETCH_CATEGORIES,
        payload:{}
    }
}
export function receiveCategories(data){
    return {
        type:allActions.RECIEVE_CATEGORIES,
        payload:data
    }
}
export function fetchCategoryById(id){
    return {
        type:allActions.FETCH_CATEGORIES_BY_ID,
        payload:id
    }
}
export function receiveCategoryById(data){
    return {
        type:allActions.RECIEVE_CATEGORIES_BY_ID,
        payload:data
    }
}
export function fetchUpdateCategory(data){
    return {
        type:allActions.FETCH_EDIT_CATEGORY,
        payload:data
    }
}
export function receiveUpdateCategoryy(data){
    return {
        type:allActions.RECIEVE_EDIT_CATEGORY,
        payload:data
    }
}
